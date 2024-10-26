import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from '../../modules/course.lesson/course.lesson.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { CourseVideo } from '../../modules/course.video/course.video.model';
export declare class CourseLessonController {
    private lessonService;
    constructor(lessonService: CourseLessonService);
    getAllCourseLessons(keyword?: string, limit?: number, skip?: number): Promise<CourseLesson[]>;
    getCourseLessonById(id: string): Promise<CourseLesson>;
    createCourseLesson(lesson: CreateCourseLessonDTO): Promise<CourseLesson>;
    updateCourseLesson(id: string, lesson: UpdateCourseLessonDTO): Promise<import("mongoose").Document<unknown, {}, CourseLesson> & CourseLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteLessonById(id: string): Promise<import("mongoose").Document<unknown, {}, CourseLesson> & CourseLesson & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    getAllLessonsOfCourse(id: string): Promise<CourseVideo[]>;
}
