import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamHistoryService } from './exam.history.service';
import { ExamHistorySchema } from './exam.history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EXAM_HISTORY_MODEL', schema: ExamHistorySchema },
    ]),
  ],
  providers: [ExamHistoryService],
  exports: [ExamHistoryService],
})
export class ExamHistoryModule {}
