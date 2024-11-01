import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import {
  COURSE_LESSON_MODEL,
  COURSE_MODEL,
  COURSE_ORDER_MODEL,
  COURSE_VIDEO_MODEL,
} from '../../processors/database/database.constants';
import { Course } from '../../modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from '../../modules/course.lesson/course.lesson.model';
import {
  FILE_COURSE_INTRO,
  FILE_COURSE_THUMB,
  RESOURCE_TYPE_IMAGE,
  RESOURCE_TYPE_VIDEO,
} from '../../constants/cloudinary.constants';
import { CloudinaryService } from '../../processors/helper/helper.service.cloudinary';
import { CourseVideo } from '../course.video/course.video.model';
import { CourseOrder } from '../course.order/course.order.model';

@Injectable({ scope: Scope.REQUEST })
export class CourseService {
  constructor(
    @Inject(COURSE_MODEL) private courseModel: Model<Course>,
    @Inject(COURSE_ORDER_MODEL) private orderModel: Model<CourseOrder>,
    @Inject(COURSE_LESSON_MODEL) private courseLessonModel: Model<CourseLesson>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(
    keyword?: string,
    category?: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<Course[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }

    const query: any = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const courses = await this.courseModel
      .find(query)
      .select('-__v')
      .populate('teacher', 'email username photoUrl')
      .populate('category', '_id category')
      .skip(skip)
      .limit(limit)
      .exec();
    return courses;
  }

  async findById(id: string): Promise<Course> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.courseModel
      .findById(id)
      .select('-__v')
      .populate('teacher', 'email username photoUrl')
      .populate('category', '_id category');

    if (!res) {
      throw new NotFoundException('Course not found.');
    }

    return res;
  }

  async save(data: CreateCourseDTO): Promise<Course> {
    const [fileImage, fileVideo] = data.files;
    const existing = await this.courseModel.findOne({ title: data.title });
    if (existing) {
      throw new BadRequestException('Course already exists');
    }

    try {
      const resultImage = await this.cloudinaryService.uploadFile(
        fileImage,
        FILE_COURSE_THUMB,
        fileImage.filename,
        RESOURCE_TYPE_IMAGE,
      );
      const resultVideo = await this.cloudinaryService.uploadFile(
        fileVideo,
        FILE_COURSE_INTRO,
        fileVideo.fieldname,
        RESOURCE_TYPE_VIDEO,
      );

      data.imageIntroduce = resultImage.url;
      data.imagePublicId = resultImage.public_id;
      data.videoIntroduce = resultVideo.url;
      data.videoPublicId = resultVideo.public_id;

      const res = await this.courseModel.create({ ...data });
      return res;
    } catch (err) {
      console.log(`Faill error: ${err}`);
      throw new BadRequestException(`Failed to upload image: ${err}`);
    }
  }

  async updateById(id: string, data: UpdateCourseDTO) {
    try {
      const [fileImage, fileVideo] = data.files;
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }

      const findOneCourse = await this.courseModel.findById(id);
      if (!findOneCourse) {
        throw new BadRequestException(`Course is not found`);
      }

      if (fileImage) {
        this.cloudinaryService.destroyFile(findOneCourse.imagePublicId);
        const updateImage = await this.cloudinaryService.uploadFile(
          fileImage,
          FILE_COURSE_THUMB,
          fileImage.filename,
          RESOURCE_TYPE_IMAGE,
        );
        data.imagePublicId = updateImage.public_id;
        data.imageIntroduce = updateImage.url;
      }

      if (fileVideo) {
        this.cloudinaryService.destroyFile(findOneCourse.videoPublicId);
        const updateVideo = await this.cloudinaryService.uploadFile(
          fileVideo,
          FILE_COURSE_INTRO,
          fileVideo.fieldname,
          RESOURCE_TYPE_VIDEO,
        );
        data.videoPublicId = updateVideo.public_id;
        data.videoIntroduce = updateVideo.url;
      }

      const valueFind = await this.courseModel
        .findByIdAndUpdate(id, data)
        .setOptions({ new: true });

      if (!valueFind) {
        throw new NotFoundException();
      }
      console.log(valueFind);
      return valueFind;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async deleteById(id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }

      const value = await this.courseModel.findById(id);
      return this.softRemove(value);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async softRemove(value: Course) {
    if (value.deleteAt != null) {
      value.deleteAt = null;
    } else {
      value.deleteAt = new Date();
    }
    const deleted = await this.courseModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true });

    return deleted;
  }

  async lessonsOf(id: string): Promise<CourseLesson[]> {
    const objectId = new mongoose.Types.ObjectId(id);
    const lessons = await this.courseLessonModel
      .aggregate([
        {
          $match: {
            course: objectId,
          },
        },
        {
          $lookup: {
            from: 'CourseVideos',
            localField: '_id',
            foreignField: 'lesson',
            as: 'videos',
          },
        },
      ])
      .exec();
    return lessons;
  }
}
