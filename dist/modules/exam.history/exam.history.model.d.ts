import { Connection, Document, Model } from 'mongoose';
import { UserModel } from '../user/user.model';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';
import { ExamSubmit } from './exam.history.dto';
interface ExamHistory extends Document {
    readonly user: Partial<UserModel>;
    readonly lesson: Partial<ExamLessonModel>;
    readonly point: Number;
    readonly correct: Partial<ExamLessonModel>;
    readonly examSubmit: Partial<ExamSubmit>[];
    readonly questions: Partial<ExamLessonModel>;
    deleteAt: Date;
}
type ExamHistoryModel = Model<ExamHistory>;
declare const createExamHistoryModel: (conn: Connection) => ExamHistoryModel;
export { ExamHistory, ExamHistoryModel, createExamHistoryModel };
