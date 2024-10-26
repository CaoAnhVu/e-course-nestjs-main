import { Test, TestingModule } from '@nestjs/testing';
import { ExamHistoryService } from './exam.history.service';
import { getModelToken } from '@nestjs/mongoose';
import { ExamHistory } from './exam.history.model'; // Ensure this path is correct
import { ExamQuestion } from '../exam.question/exam.question.model'; // Adjust if necessary
import { ExamLesson } from '../exam.lesson/exam.lesson.model'; // Adjust if necessary
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';

describe('ExamHistoryService', () => {
  let service: ExamHistoryService;
  let mockHistoryModel: any;
  let mockQuestionModel: any;
  let mockLessonModel: any;

  beforeEach(async () => {
    mockHistoryModel = {
      find: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue(Promise.resolve([])),
          }),
        }),
      }),
      findById: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    mockQuestionModel = {
      findById: jest.fn(),
    };

    mockLessonModel = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamHistoryService,
        {
          provide: getModelToken('EXAM_HISTORY_MODEL'), // Use the correct token
          useValue: mockHistoryModel,
        },
        {
          provide: getModelToken('EXAM_QUESTION_MODEL'), // Ensure this matches your actual model token
          useValue: mockQuestionModel,
        },
        {
          provide: getModelToken('EXAM_LESSON_MODEL'), // Ensure this matches your actual model token
          useValue: mockLessonModel,
        },
        {
          provide: REQUEST,
          useValue: {} as AuthenticatedRequest, // Mock authenticated request
        },
      ],
    }).compile();

    service = module.get<ExamHistoryService>(ExamHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add additional tests as needed
});
