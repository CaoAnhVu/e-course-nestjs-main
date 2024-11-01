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
  Res,
  Scope,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { Course } from '../../modules/course/course.model';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CourseLesson } from '../course.lesson/course.lesson.model';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RoleType } from '../../shared/enum/role.type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesToBodyInterceptor } from '../../decorators/api.file.decorator';

@ApiTags('Course')
@ApiBearerAuth()
@Controller({ path: 'course', scope: Scope.REQUEST })
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getAllCourses(
    @Query('q') keyword?: string,
    @Query('category') category?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Course[]> {
    return this.courseService.findAll(keyword, category, skip, limit);
  }

  @Get(':id')
  getCourseById(@Param('id', ParseObjectIdPipe) id: string): Promise<Course> {
    return this.courseService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
  createCourse(@Body() body: CreateCourseDTO) {
    return this.courseService.save(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
  updateCourse(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() course: UpdateCourseDTO,
  ) {
    return this.courseService.updateById(id, course);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  deleteCourseById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.courseService.deleteById(id);
  }

  @Get('lessonsOf/:id')
  getAllLessonsOfCourse(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CourseLesson[]> {
    return this.courseService.lessonsOf(id);
  }
}
