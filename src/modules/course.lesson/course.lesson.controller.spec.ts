import { Test, TestingModule } from '@nestjs/testing';
import { CourseLessonController } from './course.lesson.controller';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { UserService } from '../user/user.service'; // Import UserService
import { CourseLessonService } from './course.lesson.service'; // Import CourseLessonService

describe('CourseLessonController', () => {
  let controller: CourseLessonController;

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
            canActivate: jest.fn(() => true), // Mock guard để pass qua
          },
        },
        {
          provide: CourseLessonService, // Mock CourseLessonService
          useValue: {
            findLessonById: jest.fn(() => ({ id: 1, title: 'Test Lesson' })), // Mock method
          },
        },
      ],
    }).compile();

    controller = await module.resolve<CourseLessonController>(
      CourseLessonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
