import { Test, TestingModule } from '@nestjs/testing';
import { CourseLessonController } from './course.lesson.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { CourseLessonService } from './course.lesson.service';
import {
  CreateCourseLessonDTO,
  UpdateCourseLessonDTO,
} from './course.lesson.dto';

describe('CourseLessonController', () => {
  let controller: CourseLessonController;
  let service: CourseLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseLessonController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockJwtToken'),
            verify: jest.fn(() => ({ userId: 1 })),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(() => ({ id: 1, name: 'Test User' })),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: CourseLessonService,
          useValue: {
            findAll: jest.fn(() => [{ id: 1, title: 'Test Lesson' }]),
            findById: jest.fn((id: string) => ({ id, title: 'Test Lesson' })),
            save: jest.fn((lesson: CreateCourseLessonDTO) => ({
              id: 3,
              ...lesson,
            })),
            updateById: jest.fn(
              (id: string, lesson: UpdateCourseLessonDTO) => ({
                id,
                ...lesson,
              }),
            ),
            deleteById: jest.fn((id: string) =>
              id === '1'
                ? {
                    id: '1',
                    title: 'Deleted Lesson',
                    description: 'Description of deleted lesson',
                    selection: 'Selection Example',
                    course: 'Course Example',
                  }
                : null,
            ),
            videosOf: jest.fn((id: string) => [
              { id: 1, title: 'Sample Video' },
            ]),
          },
        },
      ],
    }).compile();

    controller = await module.resolve<CourseLessonController>(
      CourseLessonController,
    );
    service = await module.resolve<CourseLessonService>(CourseLessonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all course lessons', async () => {
    const result = await controller.getAllCourseLessons();
    expect(result).toEqual([{ id: 1, title: 'Test Lesson' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a course lesson by id', async () => {
    const result = await controller.getCourseLessonById('1');
    expect(result).toEqual({ id: '1', title: 'Test Lesson' });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should create and return a new course lesson', async () => {
    const newLesson = {
      title: 'New Lesson',
      description: 'Lesson Description',
      selection: 1, // Thay đổi thành số
      course: 'Course Example',
    };
    const result = await controller.createCourseLesson(newLesson);
    expect(result).toEqual({ id: 3, ...newLesson });
    expect(service.save).toHaveBeenCalledWith(newLesson);
  });

  it('should update and return an updated course lesson', async () => {
    const updatedLesson = {
      title: 'Updated Lesson',
      description: 'Updated Description',
      selection: 2, // Thay đổi thành số
      course: 'Updated Course',
    };
    const result = await controller.updateCourseLesson('1', updatedLesson);
    expect(result).toEqual({ id: '1', ...updatedLesson });
    expect(service.updateById).toHaveBeenCalledWith('1', updatedLesson);
  });

  // it('should delete a course lesson by id', async () => {
  //   // Giả lập kết quả trả về từ phương thức deleteById mà không cần _id
  //   jest.spyOn(service, 'deleteById').mockResolvedValueOnce({
  //     title: 'Deleted Lesson',
  //     description: 'Description of deleted lesson',
  //     selection: 1,
  //     course: { _id: 'mockCourseId', title: 'Mock Course' },
  //     deleteAt: new Date(),
  //   });

  //   const result = await controller.deleteLessonById('1');
  //   expect(result).toEqual({
  //     message: 'Lesson deleted successfully',
  //     success: true,
  //   });
  //   expect(service.deleteById).toHaveBeenCalledWith('1');
  // });

  it('should throw NotFoundException if course lesson not found on delete', async () => {
    jest.spyOn(service, 'deleteById').mockResolvedValueOnce(null); // Giả lập không tìm thấy lesson
    await expect(controller.deleteLessonById('2')).rejects.toThrow(
      'Lesson not found',
    );
  });

  it('should return all videos of a course lesson by id', async () => {
    const result = await controller.getAllLessonsOfCourse('1');
    expect(result).toEqual([{ id: 1, title: 'Sample Video' }]);
    expect(service.videosOf).toHaveBeenCalledWith('1');
  });
});
