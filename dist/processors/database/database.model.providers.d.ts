import { Connection } from 'mongoose';
export declare const databaseModelsProviders: ({
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/course/course.model").CourseModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/course.lesson/course.lesson.model").CourseLessonModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/course.video/course.video.model").CourseVideoModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/course.order/course.order.model").CourseOrderModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/exam/exam.model").ExamModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/exam.lesson/exam.lesson.model").ExamLessonModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/exam.question/exam.question.model").ExamQuestionModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/exam.history/exam.history.model").ExamHistoryModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/user/user.model").UserModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/feedback/feedback.model").FeedbackModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/category/category.model").CategoryModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/contact/contact.model").ContactModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("../../modules/user/forgot.password.model").ForgotPasswordModel;
    inject: string[];
})[];
