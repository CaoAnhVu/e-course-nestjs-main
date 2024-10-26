import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { CourseVideo } from '../../modules/course.video/course.video.model';
import mongoose, { Model } from 'mongoose';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { CloudinaryService } from '../../processors/helper/helper.service.clouldinary';
export declare class CourseVideoService {
  private videoModel;
  private req;
  private readonly cloudinaryService;
  constructor(
    videoModel: Model<CourseVideo>,
    req: AuthenticatedRequest,
    cloudinaryService: CloudinaryService,
  );
  findAll(
    keyword?: string,
    skip?: number,
    limit?: number,
  ): Promise<CourseVideo[]>;
  findById(id: string): Promise<CourseVideo>;
  save(data: CreateCourseVideoDTO): Promise<CourseVideo>;
  updateById(
    id: string,
    data: UpdateCourseVideoDTO,
  ): Promise<
    mongoose.Document<unknown, {}, CourseVideo> &
      CourseVideo &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
  deleteById(id: string): Promise<CourseVideo>;
  softRemove(value: CourseVideo): Promise<
    mongoose.Document<unknown, {}, CourseVideo> &
      CourseVideo &
      Required<{
        _id: unknown;
      }> & {
        __v?: number;
      }
  >;
}
