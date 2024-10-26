import { Test, TestingModule } from '@nestjs/testing';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { CloudinaryService } from '../../processors/helper/helper.service.cloudinary';
import { REQUEST } from '@nestjs/core';

describe('ExamController', () => {
  let controller: ExamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [
        ExamService,
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
          provide: getModelToken('EXAM_MODEL'), // Mock EXAM_MODEL
          useValue: {
            find: jest.fn(() => []),
            create: jest.fn(() => ({})),
          },
        },
        {
          provide: getModelToken('EXAM_LESSON_MODEL'), // Mock EXAM_LESSON_MODEL
          useValue: {
            find: jest.fn(() => []),
            create: jest.fn(() => ({})),
          },
        },
        {
          provide: getModelToken('EXAM_QUESTION_MODEL'), // Mock EXAM_QUESTION_MODEL
          useValue: {
            find: jest.fn(() => []),
            create: jest.fn(() => ({})),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn(() => ({ url: 'mockImageUrl' })),
          },
        },
        {
          provide: REQUEST,
          useValue: {
            user: { id: 1 },
          },
        },
      ],
    }).compile();

    controller = await module.resolve<ExamController>(ExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
