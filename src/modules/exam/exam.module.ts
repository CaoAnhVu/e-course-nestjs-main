import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { DatabaseModule } from '../../processors/database/database.module';
import { MongooseModule } from '@nestjs/mongoose'; // Nhớ import MongooseModule
import { ExamSchema } from './exam.schema'; // Import ExamSchema
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'EXAM_MODEL', schema: ExamSchema }]),
    DatabaseModule,
  ],
  controllers: [ExamController],
  providers: [ExamService, UserService],
})
export class ExamModule {}
