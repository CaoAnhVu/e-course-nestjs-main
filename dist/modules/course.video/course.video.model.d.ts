import { Connection, Document, Model } from 'mongoose';
import { CourseLesson } from '../course.lesson/course.lesson.model';
interface CourseVideo extends Document {
    readonly part: Number;
    readonly title: string;
    readonly hour: Number;
    readonly minute: Number;
    videoUrl: string;
    videoPublicId: string;
    readonly lesson: Partial<CourseLesson>;
    deleteAt: Date;
}
type CourseVideoModel = Model<CourseVideo>;
declare const createCourseVideoModel: (conn: Connection) => CourseVideoModel;
export { CourseVideo, CourseVideoModel, createCourseVideoModel };
