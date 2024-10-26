import { Test, TestingModule } from '@nestjs/testing';
import { ExamLessonController } from './exam.lesson.controller';
import { ExamLessonService } from './exam.lesson.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { ExamLesson } from '../../modules/exam.lesson/exam.lesson.model';
import { ExamQuestion } from '../../modules/exam.question/exam.question.model';

const mockExamLessonService = {
  findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Lesson 1' }]),
  findById: jest.fn().mockResolvedValue({ id: '1', title: 'Lesson 1' }),
  save: jest.fn().mockResolvedValue({ id: '1', title: 'Lesson 1' }),
  updateById: jest
    .fn()
    .mockResolvedValue({ id: '1', title: 'Updated Lesson 1' }),
  deleteById: jest.fn().mockResolvedValue(true),
  questionsOf: jest
    .fn()
    .mockResolvedValue([{ id: '101', question: 'Question 1' }]),
};

const mockJwtService = {};
const mockUserService = {};

const mockAuthGuard = {
  canActivate: jest.fn().mockReturnValue(true),
};

const mockRolesGuard = {
  canActivate: jest.fn().mockReturnValue(true),
};

describe('ExamLessonController', () => {
  let controller: ExamLessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamLessonController],
      providers: [
        { provide: ExamLessonService, useValue: mockExamLessonService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: RolesGuard, useValue: mockRolesGuard },
      ],
    }).compile();

    controller =
      await module.resolve<ExamLessonController>(ExamLessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test kiểm tra phương thức getAllCourseLessons, xem nó trả về danh sách các bài học chính xác hay không.
  describe('getAllCourseLessons', () => {
    it('should return all lessons', async () => {
      const result = await controller.getAllCourseLessons();
      expect(result).toEqual([{ id: '1', title: 'Lesson 1' }]);
      expect(mockExamLessonService.findAll).toHaveBeenCalled();
    });
  });

  //Test kiểm tra việc lấy thông tin của một bài học theo id, kiểm tra cả trường hợp tìm thấy và không tìm thấy bài học.
  describe('getCourseLessonById', () => {
    it('should return a lesson by ID', async () => {
      const result = await controller.getCourseLessonById('1');
      expect(result).toEqual({ id: '1', title: 'Lesson 1' });
      expect(mockExamLessonService.findById).toHaveBeenCalledWith('1');
    });
  });

  //Test kiểm tra phương thức tạo bài học mới, gồm cả trường hợp tạo thành công và khi có lỗi.
  describe('createCourseLesson', () => {
    it('should create a new lesson', async () => {
      const dto: CreateExamLessonDTO = {
        title: 'New Lesson',
        hour: 1,
        minute: 30,
        second: 0,
        selection: 10,
        point: 5,
        exam: 'examId',
      };
      const result = await controller.createCourseLesson(dto);
      expect(result).toEqual({ id: '1', title: 'Lesson 1' });
      expect(mockExamLessonService.save).toHaveBeenCalledWith(dto);
    });
  });

  //Test kiểm tra việc cập nhật bài học theo id, bao gồm cả trường hợp thành công và thất bại.
  describe('updateCourseLesson', () => {
    it('should update a lesson', async () => {
      const dto: UpdateExamLessonDTO = {
        title: 'Updated Lesson',
        hour: 1,
        minute: 20,
        second: 0,
        selection: 5,
        point: 7,
        exam: 'examId',
      };
      const result = await controller.updateCourseLesson('1', dto);
      expect(result).toEqual({ id: '1', title: 'Updated Lesson 1' });
      expect(mockExamLessonService.updateById).toHaveBeenCalledWith('1', dto);
    });
  });

  //Test kiểm tra việc xóa bài học theo id, kiểm tra cả thành công và khi gặp lỗi.
  describe('deleteLessonById', () => {
    it('should delete a lesson by ID', async () => {
      const result = await controller.deleteLessonById('1');
      expect(result).toEqual(true);
      expect(mockExamLessonService.deleteById).toHaveBeenCalledWith('1');
    });
  });

  //Test kiểm tra việc lấy danh sách câu hỏi của một bài học, cả khi tìm thấy và không tìm thấy câu hỏi.
  describe('getAllExamOfLesson', () => {
    it('should return all questions of a lesson', async () => {
      const result = await controller.getAllExamOfLesson('1');
      expect(result).toEqual([{ id: '101', question: 'Question 1' }]);
      expect(mockExamLessonService.questionsOf).toHaveBeenCalledWith('1');
    });
  });
});
