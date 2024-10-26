import mongoose, { Model } from 'mongoose';
import { Course } from '../../modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from '../../modules/course.lesson/course.lesson.model';
import { CloudinaryService } from '../../processors/helper/helper.service.clouldinary';
import { CourseOrder } from '../course.order/course.order.model';
export declare class CourseService {
  private courseModel;
  private orderModel;
  private courseLessonModel;
  private readonly cloudinaryService;
  constructor(
    courseModel: Model<Course>,
    orderModel: Model<CourseOrder>,
    courseLessonModel: Model<CourseLesson>,
    cloudinaryService: CloudinaryService,
  );
  findAll(
    keyword?: string,
    category?: string,
    skip?: number,
    limit?: number,
  ): Promise<Course[]>;
  findById(id: string): Promise<Course>;
  save(data: CreateCourseDTO): Promise<Course>;
  updateById(
    id: string,
    data: UpdateCourseDTO,
  ): Promise<
    mongoose.Document<unknown, {}, Course> &
      Course &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  deleteById(id: string): Promise<
    mongoose.Document<unknown, {}, Course> &
      Course &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  softRemove(value: Course): Promise<
    mongoose.Document<unknown, {}, Course> &
      Course &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  lessonsOf(id: string): Promise<CourseLesson[]>;
}
