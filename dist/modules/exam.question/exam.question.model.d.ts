import { Connection, Document, Model } from 'mongoose';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';
interface ExamQuestion extends Document {
    readonly question: string;
    readonly options: string[];
    readonly answer: number;
    readonly imageUrl: string;
    readonly imagePublicId: string;
    readonly lesson: Partial<ExamLessonModel>;
    deleteAt: Date;
}
type ExamQuestionModel = Model<ExamQuestion>;
declare const createExamQuestionModel: (conn: Connection) => ExamQuestionModel;
export { ExamQuestion, ExamQuestionModel, createExamQuestionModel };
