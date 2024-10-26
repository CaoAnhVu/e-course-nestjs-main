import { Connection, Document, Model } from 'mongoose';
import { UserModel } from '../user/user.model';
import { CourseModel } from '../course/course.model';
interface CourseOrder extends Document {
    readonly user: Partial<UserModel>;
    readonly course: Partial<CourseModel>;
    readonly totalPrice: Number;
    readonly payment: string;
    readonly paymentStatus: string;
    deleteAt: Date;
}
type CourseOrderModel = Model<CourseOrder>;
declare const createCourseOrderModel: (conn: Connection) => CourseOrderModel;
export { CourseOrder, CourseOrderModel, createCourseOrderModel };
