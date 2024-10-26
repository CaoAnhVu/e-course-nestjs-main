import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { CONTACT_MODEL } from '../../processors/database/database.constants';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { Contact } from '../../modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';

@Injectable({ scope: Scope.REQUEST })
export class ContactService {
  constructor(
    @Inject(CONTACT_MODEL) private contactModel: Model<Contact>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ) {}

  async findAll(
    keyword?: string,
    skip: number = 0,
    limit: number = 10,
  ): Promise<Contact[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    const query = keyword ? { topic: { $regex: keyword, $options: 'i' } } : {};

    return this.contactModel
      .find({ ...query })
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const res = await this.contactModel.findById(id); // Thêm `await`
    if (!res) {
      throw new NotFoundException('Contact not found.');
    }
    return res;
  }

  async save(data: CreateContactDTO): Promise<Contact> {
    const res = await this.contactModel.create({ ...data });
    return res;
  }

  async updateById(id: string, data: UpdateContactDTO): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const post = await this.contactModel
      .findByIdAndUpdate(id, data, { new: true }) // Chuyển logic sang một hàm gọi đầy đủ.
      .setOptions({ overwrite: true });

    if (!post) {
      throw new NotFoundException('Contact not found.');
    }
    return post;
  }

  async deleteById(id: string): Promise<boolean> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a valid id.');
    }

    const contact = await this.contactModel.findById(id);
    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }

    await this.softRemove(contact);
    return true; // Trả về true nếu xóa thành công
  }

  async softRemove(contact: Contact): Promise<Contact> {
    if (contact.deleteAt != null) {
      contact.deleteAt = null; // Nếu đã xóa mềm, phục hồi lại
    } else {
      contact.deleteAt = new Date(); // Đánh dấu là xóa mềm
    }

    return await this.contactModel.findByIdAndUpdate(
      contact._id,
      { deleteAt: contact.deleteAt }, // Chỉ cập nhật trường deleteAt
      { new: true, overwrite: true },
    );
  }
}
