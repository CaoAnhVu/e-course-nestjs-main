import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { ExamLesson } from '../../modules/exam.lesson/exam.lesson.model';
import { ExamQuestion } from '../../modules/exam.question/exam.question.model';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
export declare class ExamLessonService {
    private lessonModel;
    private questionModel;
    private req;
    constructor(lessonModel: Model<ExamLesson>, questionModel: Model<ExamQuestion>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<ExamLesson[]>;
    findById(id: string): Promise<ExamLesson>;
    save(data: CreateExamLessonDTO): Promise<ExamLesson>;
    updateById(id: string, data: UpdateExamLessonDTO): Promise<mongoose.Document<unknown, {}, ExamLesson> & ExamLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, ExamLesson> & ExamLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    softRemove(value: ExamLesson): Promise<mongoose.Document<unknown, {}, ExamLesson> & ExamLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    questionsOf(id: string): Promise<ExamQuestion[]>;
}
