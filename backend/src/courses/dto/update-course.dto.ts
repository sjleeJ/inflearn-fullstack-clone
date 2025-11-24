import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';

//PartialType: CreateCourseDto의 모든  필드가 optional이 됨
// PickType: 특정 필드만 선택 PickType(CreateUserDto, ['email', 'name']) -> email, name만 선택
// OmitType:  특정 필드만 제외 OmitType(CreateUserDto, ['password'])
//  IntersectionType (두 DTO 합치기)
// IntersectionType( PartialType(CreateUserDto),AdditionalInfoDto)

export class UpdateCourseDto extends PartialType(CreateCourseDto) {

  @ApiProperty({ description: '코스 1~2줄 짧은 설명', required: false})
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiProperty({ description: '코스 상세페이지 설명', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '썸네일 이미지 URL', required: false })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty({ description: '코스 가격', required: false })
  @IsNumber()
  price: number;

  @ApiProperty({ description: '코스 할인 가격', required: false })
  @IsNumber()
  @IsOptional()
  discountPrice?: number;

  @ApiProperty({ description: '코스 난이도', required: false })
  @IsString()
  @IsOptional()
  level?: string;

  @ApiProperty({ description: '코스 게시 여부', required: false })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ description: '코스 카테고리 ID 목록', required: false })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  categoryIds: string[];
}