import { Module } from '@nestjs/common';
import { ExamQuestionService } from './exam.question.service';
import { DatabaseModule } from '../../processors/database/database.module';
import { UserService } from '../user/user.service';
import { ExamQuestionController } from '../exam.history/exam.question.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamQuestionController],
  providers: [ExamQuestionService, UserService],
})
export class ExamQuestionModule {}
