import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { ExamLesson } from '../../modules/exam.lesson/exam.lesson.model';
import { Exam } from '../../modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { CloudinaryService } from '../../processors/helper/helper.service.clouldinary';
export declare class ExamService {
  private examModel;
  private lessonModel;
  private req;
  private readonly cloudinaryService;
  constructor(
    examModel: Model<Exam>,
    lessonModel: Model<ExamLesson>,
    req: AuthenticatedRequest,
    cloudinaryService: CloudinaryService,
  );
  findAll(
    keyword?: string,
    category?: string,
    skip?: number,
    limit?: number,
  ): Promise<Exam[]>;
  findById(id: string): Promise<Exam>;
  save(data: CreateExamDTO): Promise<Exam>;
  updateById(
    id: string,
    data: UpdateExamDTO,
  ): Promise<
    mongoose.Document<unknown, {}, Exam> &
      Exam &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  deleteAll(): Promise<any>;
  deleteById(id: string): Promise<
    mongoose.Document<unknown, {}, Exam> &
      Exam &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  softRemove(value: Exam): Promise<
    mongoose.Document<unknown, {}, Exam> &
      Exam &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  lessonsOf(id: string): Promise<ExamLesson[]>;
}
