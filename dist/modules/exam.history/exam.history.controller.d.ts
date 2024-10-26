import { ExamHistoryService } from './exam.history.service';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
export declare class ExamHistoryController {
    private historyService;
    constructor(historyService: ExamHistoryService);
    getAllExamHistorys(keywordUser?: string, keywordExam?: string, limit?: number, skip?: number): Promise<ExamHistory[]>;
    getExamHistoryById(id: string): Promise<ExamHistory>;
    createExamHistory(history: CreateExamHistoryDTO): Promise<import("mongoose").Document<unknown, {}, ExamHistory> & ExamHistory & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    updateExamHistory(id: string, history: UpdateExamHistoryDTO): Promise<import("mongoose").Document<unknown, {}, ExamHistory> & ExamHistory & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteExamHistoryById(id: string): Promise<ExamHistory>;
}
