import { Connection, Document, Model } from 'mongoose';
import { CourseModel } from '../course/course.model';
interface CourseLesson extends Document {
    readonly title: string;
    readonly selection: Number;
    readonly course: Partial<CourseModel>;
    deleteAt: Date;
}
type CourseLessonModel = Model<CourseLesson>;
declare const createCourseLessonModel: (conn: Connection) => CourseLessonModel;
export { CourseLesson, CourseLessonModel, createCourseLessonModel };
