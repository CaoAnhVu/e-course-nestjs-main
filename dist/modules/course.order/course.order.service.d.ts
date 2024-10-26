import { CourseOrder } from './course.order.model';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import mongoose, { Model } from 'mongoose';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
import { Course } from '../course/course.model';
export declare class CourseOrderService {
    private orderModel;
    private courseModel;
    private req;
    constructor(orderModel: Model<CourseOrder>, courseModel: Model<Course>, req: AuthenticatedRequest);
    findAll(keywordUser?: string, keywordCourse?: string, skip?: number, limit?: number): Promise<CourseOrder[]>;
    findById(id: string): Promise<CourseOrder>;
    save(data: CreateCourseOrderDTO): Promise<CourseOrder>;
    updateById(id: string, data: UpdateCourseOrderDTO): Promise<mongoose.Document<unknown, {}, CourseOrder> & CourseOrder & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, CourseOrder> & CourseOrder & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    softRemove(value: CourseOrder): Promise<mongoose.Document<unknown, {}, CourseOrder> & CourseOrder & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
