import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { CourseModel } from '../course/course.model';

interface CourseLesson extends Document {
  readonly title: string;
  readonly selection: number; // Thay đổi thành kiểu số chuẩn
  readonly course: CourseModel; // Sử dụng CourseModel thay vì Partial
  deleteAt: Date;
}

type CourseLessonModel = Model<CourseLesson>;

const CourseLessonSchema = new Schema<CourseLesson>({
  title: { type: SchemaTypes.String, required: true },
  selection: { type: SchemaTypes.Number, required: true },
  course: { type: SchemaTypes.ObjectId, ref: 'Course', required: true }, // Đảm bảo course là bắt buộc
  deleteAt: { type: SchemaTypes.Date, default: null },
});

const createCourseLessonModel: (conn: Connection) => CourseLessonModel = (
  connection: Connection,
) =>
  connection.model<CourseLesson>(
    'CourseLesson',
    CourseLessonSchema,
    'CourseLessons',
  );

export { CourseLesson, CourseLessonModel, createCourseLessonModel };
