import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { Category } from '../../modules/category/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
export declare class CategoryService {
    private categoryModel;
    private req;
    constructor(categoryModel: Model<Category>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    save(data: CreateCategoryDTO): Promise<Category>;
    updateById(id: string, data: UpdateCategoryDTO): Promise<mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    softRemove(value: Category): Promise<mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
