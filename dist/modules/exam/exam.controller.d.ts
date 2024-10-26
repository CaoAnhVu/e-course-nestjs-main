import { ExamService } from './exam.service';
import { Exam } from '../../modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamLesson } from '../../modules/exam.lesson/exam.lesson.model';
export declare class ExamController {
    private examService;
    constructor(examService: ExamService);
    getAllExams(keyword?: string, category?: string, limit?: number, skip?: number): Promise<Exam[]>;
    getExamById(id: string): Promise<Exam>;
    createExam(exam: CreateExamDTO): Promise<Exam>;
    updateExam(id: string, exam: UpdateExamDTO): Promise<import("mongoose").Document<unknown, {}, Exam> & Exam & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteExamById(id: string): Promise<import("mongoose").Document<unknown, {}, Exam> & Exam & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    getAllLessonsOfExam(id: string): Promise<ExamLesson[]>;
}
