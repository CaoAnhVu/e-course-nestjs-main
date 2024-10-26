import { ExamQuestion } from '../../modules/exam.question/exam.question.model';
import { ExamQuestionService } from '../exam.question/exam.question.service';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from '../exam.question/exam.question.dto';
export declare class ExamQuestionController {
    private questionService;
    constructor(questionService: ExamQuestionService);
    getAllExams(keyword?: string, limit?: number, skip?: number): Promise<ExamQuestion[]>;
    getExamById(id: string): Promise<ExamQuestion>;
    createExam(exam: CreateExamQuestionDTO): Promise<ExamQuestion>;
    updateExam(id: string, exam: UpdateExamQuestionDTO): Promise<import("mongoose").Document<unknown, {}, ExamQuestion> & ExamQuestion & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteQuestionById(id: string): Promise<import("mongoose").Document<unknown, {}, ExamQuestion> & ExamQuestion & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
