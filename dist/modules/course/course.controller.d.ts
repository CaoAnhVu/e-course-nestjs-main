import { CourseService } from './course.service';
import { Course } from '../../modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from '../course.lesson/course.lesson.model';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getAllCourses(keyword?: string, category?: string, limit?: number, skip?: number): Promise<Course[]>;
    getCourseById(id: string): Promise<Course>;
    createCourse(body: CreateCourseDTO): Promise<Course>;
    updateCourse(id: string, course: UpdateCourseDTO): Promise<import("mongoose").Document<unknown, {}, Course> & Course & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteCourseById(id: string): Promise<import("mongoose").Document<unknown, {}, Course> & Course & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    getAllLessonsOfCourse(id: string): Promise<CourseLesson[]>;
}
