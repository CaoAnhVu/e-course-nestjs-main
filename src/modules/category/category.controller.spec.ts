import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../../../src/modules/category/category.controller';
import { CategoryService } from '../../../src/modules/category/category.service';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../../../src/modules/category/category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Category } from './category.model';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockUserService = {
    findUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = await module.resolve<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCategorys', () => {
    it('should return an array of categories', async () => {
      const result: Category[] = [{ category: 'Category 1' }] as Category[];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.getAllCategorys('keyword', 10, 0)).toEqual(
        result,
      );
      expect(service.findAll).toHaveBeenCalledWith('keyword', 0, 10);
    });
  });

  describe('getCategoryById', () => {
    it('should return a single category by id', async () => {
      const result: Category = { category: 'Category 1' } as Category;
      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await controller.getCategoryById('someId')).toEqual(result);
      expect(service.findById).toHaveBeenCalledWith('someId');
    });

    it('should throw a NotFoundException if category is not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null); // Nên được xử lý bởi service

      await expect(controller.getCategoryById('invalidId')).rejects.toThrow(
        new NotFoundException('Category not found'), // Kiểm tra thông điệp ngoại lệ
      );
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const dto: CreateCategoryDTO = { category: 'New Category' };
      const result: Category = { category: 'New Category' } as Category;
      jest.spyOn(service, 'save').mockResolvedValue(result);

      expect(await controller.createCategory(dto)).toEqual(result);
      expect(service.save).toHaveBeenCalledWith(dto);
    });

    it('should return an error if category creation fails', async () => {
      const dto: CreateCategoryDTO = { category: 'New Category' };
      jest
        .spyOn(service, 'save')
        .mockRejectedValue(new Error('Creation failed'));

      await expect(controller.createCategory(dto)).rejects.toThrow(
        'Creation failed',
      );
    });
  });

  describe('updateCategory', () => {
    it('should update an existing category', async () => {
      const dto: UpdateCategoryDTO = { category: 'Updated Category' };
      const result: Category = { category: 'Updated Category' } as Category;
      jest.spyOn(service, 'updateById').mockResolvedValue(result);

      expect(await controller.updateCategory('someId', dto)).toEqual(result);
      expect(service.updateById).toHaveBeenCalledWith('someId', dto);
    });

    it('should throw a NotFoundException if category is not found for update', async () => {
      const dto: UpdateCategoryDTO = { category: 'Updated Category' };
      jest.spyOn(service, 'updateById').mockResolvedValue(null);

      await expect(controller.updateCategory('invalidId', dto)).rejects.toThrow(
        new NotFoundException('Category not found'),
      );
    });
  });

  describe('deleteCategoryById', () => {
    it('should delete a category by id', async () => {
      jest.spyOn(service, 'deleteById').mockResolvedValue(true); // Đảm bảo mock trả về boolean

      const result = await controller.deleteCategoryById('someId');
      expect(result).toBe(true); // Kiểm tra kết quả trả về
      expect(service.deleteById).toHaveBeenCalledWith('someId');
    });

    it('should throw a NotFoundException if category is not found for deletion', async () => {
      jest.spyOn(service, 'deleteById').mockResolvedValue(false); // Cần phải điều chỉnh cho trường hợp không tìm thấy category

      await expect(controller.deleteCategoryById('invalidId')).rejects.toThrow(
        new NotFoundException('Category not found'),
      );
    });
  });
});
