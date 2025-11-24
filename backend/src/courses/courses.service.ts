import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import slugfy from 'slug'

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async create(
        userId: string,
        createCourseDto: CreateCourseDto,
      ): Promise<Course> {
        // const { categoryIds, ...otherData } = createCourseDto;
    
        // return this.prisma.course.create({
        //   data: {
        //     ...otherData,
        //     categories: {
        //     // 기존에 있는값과 매핑
        //     //connect 기존에 존재하는 레코드와 연결하는 Prisma 명령어 새로 생성하지 않고 이미 DB에 있는 데이터와 관계 설정
        //     // 여러 레코드와 연결할 때 쓰인다.
        //       connect: categoryIds.map((id) => ({id}))
        //     },
        //     //Course 모델의 외래키 필드
        //     instructorId: userId,
        //   },
        // });

        return this.prisma.course.create({
          data: { 
            title: createCourseDto.title,
            slug: slugfy,
            instructorId: userId,
            status: 'DRAFT'
          }
        })
      }
    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CourseWhereUniqueInput;
        where?: Prisma.CourseWhereInput;
        orderBy?: Prisma.CourseOrderByWithRelationInput;
      }): Promise<Course[]> {
        const { skip, take, cursor, where, orderBy } = params;
    
        return this.prisma.course.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy,
        });
      }

      async findOne(id: string, include?: string[]): Promise<Course | null> {
        const includeObject = {};
    
        if (include) {
          include.forEach((item) => {
            includeObject[item] = true;
          });
        }
    
        const course = await this.prisma.course.findUnique({
          where: { id },
          include: Array.isArray(include) && include.length > 0 ? includeObject : undefined,
        });

        return course;
    }

    async update(
        id: string,
        userId: string,
        updateCourseDto: UpdateCourseDto,
      ): Promise<Course> {
        const course = await this.prisma.course.findUnique({
          where: { id },
        });
    
        if (!course) {
          throw new NotFoundException(`ID: ${id} 코스를 찾을 수 없습니다.`);
        }

        const { categoryIds, ...otherData } = updateCourseDto;
        let data: Prisma.CourseUpdateInput = {
          ...otherData,
        };
    
    
        if (course.instructorId !== userId) {
          throw new UnauthorizedException('강의의 소유자만 수정할 수 있습니다.');
        }
    
        if (categoryIds && categoryIds.length > 0) {
          /*
                현재 Course가 ["카테고리A", "카테고리B"]와 연결되어 있음
               업데이트 요청: ["카테고리C", "카테고리D"]
              categories: {
                connect: [{ id: "카테고리C" }, { id: "카테고리D" }]
              }
               결과: ["카테고리A", "카테고리B", "카테고리C", "카테고리D"]  ← 추가됨!
          */
          data.categories = {
            connect: categoryIds.map((id) => ({ id })),
            // set: categoryIds.map((id) => ({ id })),  // ← connect → set => 전체 교체
            /*
              disconnect: course.categories.map((cat) => ({ id: cat.id })), // 특정 관계 제거
              connect: categoryIds.map((id) => ({ id })),                   // 기존 관계에 추가
            */
          };
        }

        return this.prisma.course.update({
          where: { id },
          data,
        });
      }

      async delete(id: string, userId: string) {
        const course = await this.prisma.course.findUnique({
          where: { id },
        });
    
        if (!course) {
          throw new NotFoundException(`ID: ${id} 코스를 찾을 수 없습니다.`);
        }
    
        if (course.instructorId !== userId) {
          throw new UnauthorizedException('강의의 소유자만 삭제할 수 있습니다.');
        }
    
        return this.prisma.course.delete({
          where: { id },
        });
      }
}
