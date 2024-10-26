import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../../../src/modules/category/category.controller';
import { CategoryService } from '../../../src/modules/category/category.service';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../../../src/modules/category/category.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Category } from 'src/modules/category/category.model';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CategoryController>(CategoryController);
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
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const dto: CreateCategoryDTO = { category: 'New Category' };
      const result: Category = { category: 'New Category' } as Category;
      jest.spyOn(service, 'save').mockResolvedValue(result);

      expect(await controller.createCategory(dto)).toEqual(result);
      expect(service.save).toHaveBeenCalledWith(dto);
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
  });

  // describe('deleteCategoryById', () => {
  //   it('should delete a category by id', async () => {
  //     jest.spyOn(service, 'deleteById').mockResolvedValue(true);

  //     expect(await controller.deleteCategoryById('someId')).toEqual(true);
  //     expect(service.deleteById).toHaveBeenCalledWith('someId');
  //   });
  // });
});
