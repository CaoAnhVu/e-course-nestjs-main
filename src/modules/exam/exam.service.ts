import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import {
  EXAM_LESSON_MODEL,
  EXAM_MODEL,
} from '../../processors/database/database.constants';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { ExamLesson } from '../../modules/exam.lesson/exam.lesson.model';
import { Exam } from './exam.model'; // Cập nhật để sử dụng đúng đường dẫn
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import {
  FILE_COURSE_INTRO,
  FILE_EXAM_THUMB,
  RESOURCE_TYPE_IMAGE,
} from '../../constants/cloudinary.constants';
import { CloudinaryService } from '../../processors/helper/helper.service.cloudinary';
import { getModelToken } from '@nestjs/mongoose';

@Injectable({ scope: Scope.REQUEST })
export class ExamService {
  constructor(
    @Inject(getModelToken(EXAM_MODEL)) private examModel: Model<Exam>,
    @Inject(getModelToken(EXAM_LESSON_MODEL))
    private lessonModel: Model<ExamLesson>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Lấy tất cả các bài kiểm tra
  async findAll(
    keyword?: string,
    category?: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<Exam[]> {
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

    return this.examModel
      .find(query)
      .select('-__v')
      .populate('category', '_id category')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  // Lấy bài kiểm tra theo ID
  async findById(id: string): Promise<Exam> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid exam ID.');
    }

    const exam = await this.examModel
      .findById(id)
      .populate('category', '_id category')
      .exec();

    if (!exam) {
      throw new NotFoundException('Exam not found.');
    }

    return exam;
  }

  // Tạo bài kiểm tra mới
  async save(data: CreateExamDTO): Promise<Exam> {
    const fileImage = data.file;
    const existingExam = await this.examModel.findOne({ title: data.title });

    if (existingExam) {
      throw new BadRequestException('Exam already exists');
    }

    try {
      const resultImage = await this.cloudinaryService.uploadFile(
        fileImage,
        FILE_COURSE_INTRO,
        fileImage.fieldname,
        RESOURCE_TYPE_IMAGE,
      );

      data.imageUrl = resultImage.url;
      data.imagePublicId = resultImage.public_id;

      const newExam = new this.examModel(data);
      return await newExam.save(); // Sử dụng .save() để lưu mô hình
    } catch (err) {
      console.error(`Error uploading image: ${err.message}`);
      throw new BadRequestException(`Failed to upload image: ${err.message}`);
    }
  }

  // Cập nhật bài kiểm tra theo ID
  async updateById(id: string, data: UpdateExamDTO): Promise<Exam> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid exam ID.');
    }

    const existingExam = await this.examModel.findById(id);
    if (!existingExam) {
      throw new NotFoundException('Exam not found.');
    }

    if (data.file) {
      await this.cloudinaryService.destroyFile(existingExam.imagePublicId);
      const updateImage = await this.cloudinaryService.uploadFile(
        data.file,
        FILE_EXAM_THUMB,
        data.file.filename,
        RESOURCE_TYPE_IMAGE,
      );
      data.imagePublicId = updateImage.public_id;
      data.imageUrl = updateImage.url;
    }

    Object.assign(existingExam, data); // Cập nhật các trường mới
    return await existingExam.save(); // Sử dụng .save() để lưu mô hình
  }

  // Xóa tất cả các bài kiểm tra
  async deleteAll(): Promise<any> {
    return this.examModel.deleteMany({}).exec();
  }

  // Xóa bài kiểm tra theo ID
  async deleteById(id: string): Promise<Exam> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid exam ID.');
    }

    const existingExam = await this.examModel.findById(id);
    if (!existingExam) {
      throw new NotFoundException('Exam not found.');
    }

    return this.softRemove(existingExam); // Gọi phương thức softRemove
  }

  // Xóa mềm bài kiểm tra
  async softRemove(value: Exam): Promise<Exam> {
    value.deleteAt = value.deleteAt ? null : new Date(); // Xóa hoặc khôi phục
    return await this.examModel
      .findByIdAndUpdate(value.id, value, { new: true }) // Cập nhật với tùy chọn new
      .exec();
  }

  // Lấy danh sách các bài học của bài kiểm tra
  async lessonsOf(id: string): Promise<ExamLesson[]> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid exam ID.');
    }

    return await this.lessonModel
      .aggregate([
        {
          $match: {
            exam: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'ExamQuestions', // Tên collection để tìm kiếm
            localField: '_id',
            foreignField: 'lesson',
            as: 'questions',
          },
        },
      ])
      .exec();
  }
}
