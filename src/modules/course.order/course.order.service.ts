import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
import { CourseOrder } from './course.order.model';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { Course } from '../course/course.model';

@Injectable({ scope: Scope.REQUEST })
export class CourseOrderService {
  constructor(
    @Inject(getModelToken('COURSE_ORDER_MODEL')) // Đảm bảo đây là tên chính xác
    private orderModel: Model<CourseOrder>,
    @Inject(getModelToken('Course')) // Đổi từ 'COURSE_MODEL' thành 'Course'
    private courseModel: Model<Course>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ) {}

  async findAll(
    keywordUser?: string,
    keywordCourse?: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<CourseOrder[]> {
    if (keywordUser?.trim() === '') {
      throw new BadRequestException('User keyword cannot be empty or spaces.');
    }
    if (keywordCourse?.trim() === '') {
      throw new BadRequestException(
        'Course keyword cannot be empty or spaces.',
      );
    }

    const query: any = {};
    if (keywordUser) {
      query.user = { $regex: keywordUser, $options: 'i' };
    }
    if (keywordCourse) {
      query.course = { $regex: keywordCourse, $options: 'i' };
    }

    return this.orderModel
      .find(query)
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<CourseOrder> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format.');
    }

    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('CourseOrder not found.');
    }
    return order;
  }

  async save(data: CreateCourseOrderDTO): Promise<CourseOrder> {
    const course = await this.courseModel.findById(data.course);
    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    course.register = (course.register || 0) + 1; // Ensure register is initialized
    await this.courseModel.findByIdAndUpdate(course.id, course);

    return this.orderModel.create({ ...data });
  }

  async updateById(
    id: string,
    data: UpdateCourseOrderDTO,
  ): Promise<CourseOrder> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format.');
    }

    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedOrder) {
      throw new NotFoundException('CourseOrder not found for update.');
    }
    return updatedOrder;
  }

  async deleteById(id: string): Promise<CourseOrder> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format.');
    }

    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('CourseOrder not found for deletion.');
    }
    return this.softRemove(order);
  }

  async softRemove(order: CourseOrder): Promise<CourseOrder> {
    order.deleteAt = order.deleteAt ? null : new Date(); // Toggle deleteAt
    return this.orderModel.findByIdAndUpdate(order.id, order, { new: true });
  }
}
