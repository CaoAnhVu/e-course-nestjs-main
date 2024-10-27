import { Test, TestingModule } from '@nestjs/testing';
import { ExamHistoryService } from './exam.history.service';
import { getModelToken } from '@nestjs/mongoose';
import { ExamHistory } from './exam.history.schema';
import { REQUEST } from '@nestjs/core';

describe('ExamHistoryService', () => {
  let service: ExamHistoryService;

  beforeEach(async () => {
    const mockExamHistoryModel = {
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

    const mockQuestionModel = {
      findById: jest.fn(),
    };

    const mockLessonModel = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamHistoryService,
        {
          provide: getModelToken(ExamHistory.name), // Use the name of your schema
          useValue: mockExamHistoryModel,
        },
        {
          provide: getModelToken('EXAM_QUESTION_MODEL'), // Ensure this matches the model token used in your application
          useValue: mockQuestionModel,
        },
        {
          provide: getModelToken('EXAM_LESSON_MODEL'),
          useValue: mockLessonModel,
        },
        {
          provide: REQUEST,
          useValue: {}, // Mocking the request if necessary
        },
      ],
    }).compile();

    service = module.get<ExamHistoryService>(ExamHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests as needed
});
