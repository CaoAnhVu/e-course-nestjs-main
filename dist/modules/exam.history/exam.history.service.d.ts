import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
import { ExamQuestion } from '../exam.question/exam.question.model';
import { ExamLesson } from '../exam.lesson/exam.lesson.model';
export declare class ExamHistoryService {
    private historyModel;
    private questionModel;
    private lessonModel;
    private req;
    constructor(historyModel: Model<ExamHistory>, questionModel: Model<ExamQuestion>, lessonModel: Model<ExamLesson>, req: AuthenticatedRequest);
    findAll(keywordUser?: string, keywordExam?: string, skip?: number, limit?: number): Promise<ExamHistory[]>;
    findById(id: string): Promise<ExamHistory>;
    save(data: CreateExamHistoryDTO): Promise<mongoose.Document<unknown, {}, ExamHistory> & ExamHistory & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    updateById(id: string, data: UpdateExamHistoryDTO): Promise<mongoose.Document<unknown, {}, ExamHistory> & ExamHistory & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteById(id: string): Promise<ExamHistory>;
    softRemove(value: ExamHistory): Promise<mongoose.Document<unknown, {}, ExamHistory> & ExamHistory & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
