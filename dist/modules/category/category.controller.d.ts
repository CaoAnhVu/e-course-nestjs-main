import { CategoryService } from './category.service';
import { Category } from '../../modules/category/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllCategorys(keyword?: string, limit?: number, skip?: number): Promise<Category[]>;
    getCategoryById(id: string): Promise<Category>;
    createCategory(category: CreateCategoryDTO): Promise<Category>;
    updateCategory(id: string, category: UpdateCategoryDTO): Promise<import("mongoose").Document<unknown, {}, Category> & Category & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    deleteCategoryById(id: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
