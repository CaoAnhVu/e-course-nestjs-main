import { CourseOrderService } from './course.order.service';
import { CourseOrder } from './course.order.model';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
export declare class CourseOrderController {
    private orderService;
    constructor(orderService: CourseOrderService);
    getAllCourseOrders(keywordUser?: string, keywordCourse?: string, limit?: number, skip?: number): Promise<CourseOrder[]>;
    getCourseOrderById(id: string): Promise<CourseOrder>;
    createCourseOrder(courseOrder: CreateCourseOrderDTO): Promise<CourseOrder>;
    updateCourseOrder(id: string, courseOrder: UpdateCourseOrderDTO): Promise<import("mongoose").Document<unknown, {}, CourseOrder> & CourseOrder & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteCourseOrderById(id: string): Promise<import("mongoose").Document<unknown, {}, CourseOrder> & CourseOrder & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
