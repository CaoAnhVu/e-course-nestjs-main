// course.order.model.ts
import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { UserModel } from '../user/user.model';
import { CourseModel } from '../course/course.model';

interface CourseOrder extends Document {
  readonly user: Partial<UserModel>;
  readonly course: Partial<CourseModel>;
  readonly totalPrice: number;
  readonly payment: string;
  readonly paymentStatus: string;
  deleteAt: Date;
}

type CourseOrderModel = Model<CourseOrder>;

const CourseOrderSchema = new Schema<CourseOrder>(
  {
    user: { type: SchemaTypes.ObjectId, ref: 'User' },
    course: { type: SchemaTypes.ObjectId, ref: 'Course' },
    totalPrice: { type: SchemaTypes.Number, required: true },
    payment: { type: SchemaTypes.String, required: true },
    paymentStatus: { type: SchemaTypes.String, required: true },
    deleteAt: { type: SchemaTypes.Date, default: null },
  },
  { timestamps: true },
);

// Xuất khẩu CourseOrderSchema và các thành phần khác
const createCourseOrderModel = (conn: Connection): CourseOrderModel =>
  conn.model<CourseOrder>('CourseOrder', CourseOrderSchema, 'CourseOrders');

export {
  CourseOrder,
  CourseOrderModel,
  createCourseOrderModel,
  CourseOrderSchema,
};
