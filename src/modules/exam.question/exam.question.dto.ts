import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ApiFile } from '../../decorators/api.file.decorator';

export class CreateExamQuestionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly question: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => String)
  readonly options: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly answer: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lesson: string;

  @IsOptional()
  @ApiFile()
  file?: Express.Multer.File = null;
}

export class UpdateExamQuestionDTO {
  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly question?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly options?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly answer?: number;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly lesson?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ApiFile()
  file?: Express.Multer.File;
}
