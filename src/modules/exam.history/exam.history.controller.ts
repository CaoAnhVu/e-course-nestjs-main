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
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExamHistoryService } from './exam.history.service';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { RoleType } from '../../shared/enum/role.type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { AuthGuard } from '../../auth/guard/auth.guard';

@ApiTags('Exam History')
@ApiBearerAuth()
@Controller({ path: 'history', scope: Scope.REQUEST })
export class ExamHistoryController {
  constructor(private historyService: ExamHistoryService) {}

  @Get('')
  @ApiQuery({ name: 'qUser', required: false })
  @ApiQuery({ name: 'qExam', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  getAllExamHistorys(
    @Query('qUser') keywordUser?: string,
    @Query('qExam') keywordExam?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<ExamHistory[]> {
    return this.historyService.findAll(keywordUser, keywordExam, skip, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  getExamHistoryById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ExamHistory> {
    return this.historyService.findById(id);
  }

  @Post('')
  createExamHistory(@Body() history: CreateExamHistoryDTO) {
    return this.historyService.save(history);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  updateExamHistory(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() history: UpdateExamHistoryDTO,
  ) {
    return this.historyService.updateById(id, history);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  deleteExamHistoryById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.historyService.deleteById(id);
  }
}
