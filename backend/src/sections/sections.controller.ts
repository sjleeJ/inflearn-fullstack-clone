import { Body, Controller, Param, Post, Req, UseGuards, Get, Delete, Patch } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section as SectionEntity } from 'src/_gen/prisma-class/section';
import { UpdateSectionDto } from './dto/update-section.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  /**
   * 
   * // Guard가 하는 일
1. 요청 들어옴 → 2. Guard 실행 → 3. 통과하면 Controller 실행
                  → 실패하면 에러 반환
   */
  @Post('courses/:courseId/sections')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '새 섹션 생성' })
  @ApiParam({ name: 'courseId', description: '코스 ID' })
  @ApiBody({ type: CreateSectionDto })
  @ApiOkResponse({
    description: '섹션 생성 성공',
    type: SectionEntity,
  })
  create(
    @Param('courseId') courseId: string,
    @Body() createSectionDto: CreateSectionDto,
    @Req() req: Request,
  ) {
    return this.sectionsService.create(
      courseId,
      createSectionDto,
      (req as any).user.sub,
    );
  }

  @Get(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 상세 정보' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiOkResponse({
    description: '섹션 상세 정보',
    type: SectionEntity,
  })
  findOne(@Param('sectionId') sectionId: string, @Req() req: Request) {
    return this.sectionsService.findOne(sectionId, (req as any).user.sub);
  }

  @Patch(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 업데이트' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiBody({ type: UpdateSectionDto })
  @ApiOkResponse({
    description: '섹션 업데이트 성공',
    type: SectionEntity,
  })
  update(
    @Param('sectionId') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @Req() req: Request,
  ) {
    return this.sectionsService.update(
      sectionId,
      updateSectionDto,
      (req as any).user.sub,
    );
  }

  @Delete(':sectionId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '섹션 삭제' })
  @ApiParam({ name: 'sectionId', description: '섹션 ID' })
  @ApiOkResponse({
    description: '섹션 삭제 성공',
    type: SectionEntity,
  })
  delete(@Param('sectionId') sectionId: string, @Req() req: Request) {
    return this.sectionsService.delete(sectionId, (req as any).user.sub);
  }
}
