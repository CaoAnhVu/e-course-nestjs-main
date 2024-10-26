import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { CATEGORY_MODEL } from '../../processors/database/database.constants';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { Category } from '../../modules/category/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';

@Injectable({ scope: Scope.REQUEST })
export class CategoryService {
  constructor(
    @Inject(CATEGORY_MODEL) private categoryModel: Model<Category>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ) {}

  async findAll(
    keyword?: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<Category[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    const query = keyword
      ? { category: { $regex: keyword, $options: 'i' } }
      : {};

    return this.categoryModel
      .find({ ...query })
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Category> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const res = await this.categoryModel.findById(id); // Thêm await
    if (!res) {
      throw new NotFoundException('Category not found.');
    }
    return res;
  }

  async save(data: CreateCategoryDTO): Promise<Category> {
    if (data.category == '') {
      throw new BadRequestException("Can't ");
    }
    const existingCategory = await this.categoryModel.findOne({
      category: data.category,
    });
    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const res = await this.categoryModel.create({ ...data });
    return res;
  }

  async updateById(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const existingCategory = await this.categoryModel.findOne({
      category: data.category,
    });
    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const post = await this.categoryModel.findByIdAndUpdate(id, data, {
      new: true,
    }); // Thêm { new: true }
    if (!post) {
      throw new NotFoundException('Category not found.');
    }
    return post;
  }

  async deleteById(id: string): Promise<boolean> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const value = await this.categoryModel.findById(id);
    if (!value) {
      throw new NotFoundException('Category not found.');
    }

    await this.softRemove(value);
    return true; // Trả về true sau khi xóa
  }

  async softRemove(value: Category): Promise<Category> {
    if (value.deleteAt != null) {
      value.deleteAt = null;
    } else {
      value.deleteAt = new Date();
    }
    const post = await this.categoryModel
      .findByIdAndUpdate(value.id, value, { new: true }) // Thêm { new: true }
      .exec();

    return post;
  }
}
