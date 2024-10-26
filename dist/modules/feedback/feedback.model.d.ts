import { Connection, Document, Model } from 'mongoose';
import { UserModel } from '../user/user.model';
import { CourseModel } from '../course/course.model';
interface Feedback extends Document {
    readonly user: Partial<UserModel>;
    readonly course: Partial<CourseModel>;
    readonly title: string;
    readonly rating: Number;
    deleteAt: Date;
}
type FeedbackModel = Model<Feedback>;
declare const createFeedbackModel: (conn: Connection) => FeedbackModel;
export { Feedback, FeedbackModel, createFeedbackModel };
