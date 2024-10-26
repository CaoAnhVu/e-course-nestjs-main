import mongoose, { Model } from 'mongoose';
import { ExamQuestion } from '../../modules/exam.question/exam.question.model';
import {
  CreateExamQuestionDTO,
  UpdateExamQuestionDTO,
} from './exam.question.dto';
import { CloudinaryService } from '../../processors/helper/helper.service.cloudinary';
export declare class ExamQuestionService {
  private questionModel;
  private readonly cloudinaryService;
  constructor(
    questionModel: Model<ExamQuestion>,
    cloudinaryService: CloudinaryService,
  );
  findAll(
    keyword?: string,
    skip?: number,
    limit?: number,
  ): Promise<ExamQuestion[]>;
  findById(id: string): Promise<ExamQuestion>;
  save(data: CreateExamQuestionDTO): Promise<ExamQuestion>;
  updateById(
    id: string,
    data: UpdateExamQuestionDTO,
  ): Promise<
    mongoose.Document<unknown, {}, ExamQuestion> &
      ExamQuestion &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  deleteById(id: string): Promise<
    mongoose.Document<unknown, {}, ExamQuestion> &
      ExamQuestion &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  softRemove(value: ExamQuestion): Promise<
    mongoose.Document<unknown, {}, ExamQuestion> &
      ExamQuestion &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
}
