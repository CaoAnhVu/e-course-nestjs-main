import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamHistory, ExamHistorySchema } from './exam.history.schema';
import { ExamHistoryService } from './exam.history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamHistory.name, schema: ExamHistorySchema },
    ]),
  ],
  providers: [ExamHistoryService],
  exports: [ExamHistoryService],
})
export class ExamHistoryModule {}
