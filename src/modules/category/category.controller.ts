import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Scope,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RoleType } from '../../shared/enum/role.type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { Responser } from '../../decorators/responser.decorator';

@ApiTags('Category')
@ApiBearerAuth()
@Controller({ path: 'categorys', scope: Scope.REQUEST })
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  async getAllCategorys(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Category[]> {
    return this.categoryService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Category> {
    const category = await this.categoryService.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async createCategory(@Body() category: CreateCategoryDTO): Promise<Category> {
    return this.categoryService.save(category);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async updateCategory(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() category: UpdateCategoryDTO,
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.updateById(id, category);
    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }
    return updatedCategory;
  }

  @Delete(':id')
  @Responser.handle('Delete category')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async deleteCategoryById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<boolean> {
    const deleted = await this.categoryService.deleteById(id);
    if (!deleted) {
      throw new NotFoundException('Category not found');
    }
    return deleted;
  }
}
