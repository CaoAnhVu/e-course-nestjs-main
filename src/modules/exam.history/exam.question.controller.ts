import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  Scope,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExamQuestion } from '../../modules/exam.question/exam.question.model';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { RoleType } from '../../shared/enum/role.type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor } from '../../decorators/api.file.decorator';
import { ExamQuestionService } from '../exam.question/exam.question.service';
import {
  CreateExamQuestionDTO,
  UpdateExamQuestionDTO,
} from '../exam.question/exam.question.dto';

@ApiTags('Exam question')
@ApiBearerAuth()
@Controller({ path: 'exam_questions', scope: Scope.REQUEST })
export class ExamQuestionController {
  constructor(private questionService: ExamQuestionService) {}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getAllExams(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<ExamQuestion[]> {
    return this.questionService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getExamById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ExamQuestion> {
    return this.questionService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  createExam(@Body() exam: CreateExamQuestionDTO) {
    return this.questionService.save(exam);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  updateExam(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() exam: UpdateExamQuestionDTO,
  ) {
    return this.questionService.updateById(id, exam);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  deleteQuestionById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.questionService.deleteById(id);
  }
}
