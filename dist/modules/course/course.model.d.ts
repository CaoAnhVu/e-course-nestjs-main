import { Connection, Document, Model } from 'mongoose';
import { CategoryModel } from '../category/category.model';
import { User } from '../user/user.model';
interface Course extends Document {
    readonly title: string;
    readonly price: Number;
    readonly description: string;
    rating: number;
    register: number;
    reviews: number;
    readonly imageIntroduce: string;
    readonly imagePublicId: string;
    readonly videoIntroduce: string;
    readonly videoPublicId: string;
    readonly time: Number;
    readonly language: string;
    readonly teacher: Partial<User>;
    readonly category: Partial<CategoryModel>;
    deleteAt: Date;
}
type CourseModel = Model<Course>;
declare const createCourseModel: (conn: Connection) => CourseModel;
export { Course, CourseModel, createCourseModel };
