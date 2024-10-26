import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { CourseLesson } from '../../modules/course.lesson/course.lesson.model';
import { CourseVideo } from '../../modules/course.video/course.video.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
export declare class CourseLessonService {
    private lessonModel;
    private videoModel;
    private req;
    constructor(lessonModel: Model<CourseLesson>, videoModel: Model<CourseVideo>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<CourseLesson[]>;
    findById(id: string): Promise<CourseLesson>;
    save(data: CreateCourseLessonDTO): Promise<CourseLesson>;
    updateById(id: string, data: UpdateCourseLessonDTO): Promise<mongoose.Document<unknown, {}, CourseLesson> & CourseLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, CourseLesson> & CourseLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    softRemove(value: CourseLesson): Promise<mongoose.Document<unknown, {}, CourseLesson> & CourseLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    videosOf(id: string): Promise<CourseVideo[]>;
}
