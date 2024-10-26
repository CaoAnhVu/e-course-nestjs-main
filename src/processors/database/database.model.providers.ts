import {
  BLOG_MODEL,
  CATEGORY_MODEL,
  CONTACT_MODEL,
  COURSE_LESSON_MODEL,
  COURSE_MODEL,
  COURSE_ORDER_MODEL,
  COURSE_VIDEO_MODEL,
  DATABASE_CONNECTION,
  EXAM_HISTORY_MODEL,
  EXAM_LESSON_MODEL,
  EXAM_MODEL,
  EXAM_QUESTION_MODEL,
  FEEDBACK_MODEL,
  FORGOT_PASSWORD_MODEL,
  USER_MODEL,
} from './database.constants';
import { Connection } from 'mongoose';
import { createCourseModel } from '../../modules/course/course.model';
import { createCourseLessonModel } from '../../modules/course.lesson/course.lesson.model';
import { createCourseVideoModel } from '../../modules/course.video/course.video.model';
import { createCourseOrderModel } from '../../modules/course.order/course.order.model';
import { createExamModel } from '../../modules/exam/exam.model';
import { createExamLessonModel } from '../../modules/exam.lesson/exam.lesson.model';
import { createExamHistoryModel } from '../../modules/exam.history/exam.history.model';
import { createUserModel } from '../../modules/user/user.model';
import { createFeedbackModel } from '../../modules/feedback/feedback.model';
import { createCategoryModel } from '../../modules/category/category.model';
import { createContactModel } from '../../modules/contact/contact.model';
import { createForgotPasswordModel } from '../../modules/user/forgot.password.model';
import { createExamQuestionModel } from '../../modules/exam.question/exam.question.model';

export const databaseModelsProviders = [
  // course
  {
    provide: COURSE_MODEL,
    useFactory: (connection: Connection) => createCourseModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: COURSE_LESSON_MODEL,
    useFactory: (connection: Connection) => createCourseLessonModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: COURSE_VIDEO_MODEL,
    useFactory: (connection: Connection) => createCourseVideoModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: COURSE_ORDER_MODEL,
    useFactory: (connection: Connection) => createCourseOrderModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  // exam
  {
    provide: EXAM_MODEL,
    useFactory: (connection: Connection) => createExamModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: EXAM_LESSON_MODEL,
    useFactory: (connection: Connection) => createExamLessonModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: EXAM_QUESTION_MODEL,
    useFactory: (connection: Connection) => createExamQuestionModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: EXAM_HISTORY_MODEL,
    useFactory: (connection: Connection) => createExamHistoryModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  // user
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => createUserModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: FEEDBACK_MODEL,
    useFactory: (connection: Connection) => createFeedbackModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => createUserModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: CATEGORY_MODEL,
    useFactory: (connection: Connection) => createCategoryModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: CONTACT_MODEL,
    useFactory: (connection: Connection) => createContactModel(connection),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: FORGOT_PASSWORD_MODEL,
    useFactory: (connection: Connection) =>
      createForgotPasswordModel(connection),
    inject: [DATABASE_CONNECTION],
  },
];
