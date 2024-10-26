import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamHistoryDocument = ExamHistory & Document;

@Schema()
export class ExamHistory {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  examId: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  dateTaken: Date;
}

export const ExamHistorySchema = SchemaFactory.createForClass(ExamHistory);
