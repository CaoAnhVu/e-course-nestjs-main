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
  NotFoundException,
} from '@nestjs/common';
import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from '../../modules/course.lesson/course.lesson.model';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import {
  CreateCourseLessonDTO,
  UpdateCourseLessonDTO,
} from './course.lesson.dto';
import { Response } from 'express';
import { CourseVideo } from '../../modules/course.video/course.video.model';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RoleType } from '../../shared/enum/role.type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';

@ApiTags('Course Lesson')
@ApiBearerAuth()
@Controller({ path: 'course_lessons', scope: Scope.REQUEST })
export class CourseLessonController {
  constructor(private lessonService: CourseLessonService) {}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  getAllCourseLessons(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<CourseLesson[]> {
    return this.lessonService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCourseLessonById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CourseLesson> {
    return this.lessonService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  createCourseLesson(@Body() lesson: CreateCourseLessonDTO) {
    return this.lessonService.save(lesson);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  updateCourseLesson(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() lesson: UpdateCourseLessonDTO,
  ) {
    return this.lessonService.updateById(id, lesson);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async deleteLessonById(@Param('id', ParseObjectIdPipe) id: string) {
    const result = await this.lessonService.deleteById(id);
    if (!result) {
      throw new NotFoundException('Lesson not found');
    }
    return { message: 'Lesson deleted successfully', success: true };
  }

  @Get('videosOf/:id')
  getAllLessonsOfCourse(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CourseVideo[]> {
    return this.lessonService.videosOf(id);
  }
}
