import { Connection, Document, Model, Schema } from 'mongoose';
import { CourseModel } from '../course/course.model';
import { ExamModel } from '../exam/exam.model';
import { RoleType } from '../../shared/enum/role.type.enum';
import { Observable } from 'rxjs';
interface User extends Document {
    comparePassword(password: string): Observable<boolean>;
    readonly email: string;
    readonly password: string;
    readonly username: string;
    photoUrl: string;
    photoPublicId: string;
    readonly roles?: RoleType[];
    courses: Partial<CourseModel>;
    favouritesCourses: Partial<CourseModel>;
    favouritesExams: Partial<ExamModel>;
    finishedExams: Partial<ExamModel>;
    lockAt: Date;
}
type UserModel = Model<User>;
declare const UserSchema: Schema<User, Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
declare function preSaveHook(next: any): Promise<any>;
declare function comparePasswordMethod(password: string): Observable<boolean>;
declare const createUserModel: (conn: Connection) => UserModel;
export { User, UserModel, createUserModel, UserSchema, preSaveHook, comparePasswordMethod, };
