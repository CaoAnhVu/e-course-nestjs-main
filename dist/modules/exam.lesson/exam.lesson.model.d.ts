import { Connection, Document, Model } from 'mongoose';
import { ExamModel } from '../exam/exam.model';
interface ExamLesson extends Document {
    readonly title: string;
    readonly hour: Number;
    readonly minute: Number;
    readonly second: Number;
    readonly selection: Number;
    readonly point: number;
    readonly exam: Partial<ExamModel>;
    deleteAt: Date;
}
type ExamLessonModel = Model<ExamLesson>;
declare const createExamLessonModel: (conn: Connection) => ExamLessonModel;
export { ExamLesson, ExamLessonModel, createExamLessonModel };
