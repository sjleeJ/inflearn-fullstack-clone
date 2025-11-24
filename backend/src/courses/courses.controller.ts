import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import type { Request } from 'express';  
import { CreateCourseDto } from './dto/create-course.dto';
import type { Prisma } from '@prisma/client'; 
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course as CourseEntity } from 'src/_gen/prisma-class/course';


@ApiTags('courses')
@Controller('courses')
@ApiOkResponse({
  description: '코스 생성',
  type: CourseEntity
})
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AccessTokenGuard) // 실제로 토큰 검증을 수행하는 가드, 요청이 들어올 때 JWT 토큰을 확인함
  @ApiBearerAuth('access-token') // Swagger 문서에서 이 API가 Bearer Token 인증이 필요하다고 표시
  async create(@Req() req: Request, @Body() createCourseDto: CreateCourseDto){
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.coursesService.create(req.user.sub, createCourseDto)
  }

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiOkResponse({
    description: '코스 목록',
    type: CourseEntity,
    isArray: true
  })
  async findAll(
    //Pipes 데이터 변환과 유효성 검증을 담당, 요청 데이터가 컨트롤러에 도달하기 전에 처리
    @Query('title') title?: string,
    @Query('level') level?: string,
    @Query('categoryId') categoryId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const where: Prisma.CourseWhereInput = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    if (level) {
      where.level = level;
    }

    if (categoryId) {
      where.categories = { 
        // some은 Prisma에서 관계형 데이터를 필터링할 때 사용하는 조건자
        // some의 의미: "하나 이상이 조건을 만족하면 포함"
        // every - 모두 만족
        // none - 하나도 만족하지 않음
        // 해석: "categories 중에서 하나라도 id가 categoryId와 같은 것이 있는 Course를 찾아줘"
        some: {
          id: categoryId,   // ← CourseCategory의 id
        },
      };
    }

    return await this.coursesService.findAll({
      where,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':id')
  @ApiQuery({
    name: 'include',
    required: false,
    description: 'sections,lectures,courseReviews 등 포함할 관계 지정',
  })
  @ApiOkResponse({
    description: '코스 상세 정보',
    type: CourseEntity,
  })
  async findOne(
    // nest에서 ParseUUIDPipe 자체적으로 uuid검증 nest-pipe 알아보기
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') include?: string,
  ) {
    const includeArray = include ? include.split(',') : undefined;

    return await this.coursesService.findOne(id, includeArray);
  }


  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스 수정',
    type: CourseEntity
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.coursesService.update(id, req.user.sub, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '코스 삭제',
    type: CourseEntity
  })
  async delete(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.coursesService.delete(id, req.user.sub);
  }
}
