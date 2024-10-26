import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ExamQuestionService } from './exam.question.service'; // Import ExamQuestionService
import { ExamQuestionController } from '../exam.history/exam.question.controller';

describe('ExamQuestionController', () => {
  let controller: ExamQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamQuestionController],
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
          provide: ExamQuestionService, // Mock ExamQuestionService
          useValue: {
            findAll: jest.fn(() => [{ id: 1, question: 'Sample Question' }]),
            findOne: jest.fn(() => ({ id: 1, question: 'Sample Question' })),
          },
        },
      ],
    }).compile();

    controller = await module.resolve<ExamQuestionController>(
      ExamQuestionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
