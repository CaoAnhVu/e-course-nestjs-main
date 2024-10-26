import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateFeedbackDTO } from './feedback.dto';

// Mock for FeedbackService
const mockFeedbackService = {
  findAll: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue({ id: '1', message: 'Test feedback' }),
  save: jest.fn().mockResolvedValue({ id: '1', message: 'Test feedback' }),
  updateById: jest
    .fn()
    .mockResolvedValue({ id: '1', message: 'Updated feedback' }),
  deleteById: jest
    .fn()
    .mockResolvedValue({ id: '1', message: 'Deleted feedback' }),
};

// Mock for JwtService (if your controller uses it)
const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockedToken'),
};

// Mock for UserService (if needed)
const mockUserService = {};

describe('FeedbackController', () => {
  let controller: FeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        { provide: FeedbackService, useValue: mockFeedbackService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = await module.resolve<FeedbackController>(FeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all feedbacks', async () => {
    const feedbacks = await controller.getAllFeedbacks();
    expect(feedbacks).toEqual([]);
    expect(mockFeedbackService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should get feedback by id', async () => {
    const feedback = await controller.getFeedbackById('1');
    expect(feedback).toEqual({ id: '1', message: 'Test feedback' });
    expect(mockFeedbackService.findById).toHaveBeenCalledWith('1');
  });

  it('should create feedback', async () => {
    const feedbackData: CreateFeedbackDTO = {
      user: 'user1',
      course: 'course1',
      title: 'Great course!',
      rating: 5,
    };

    const result = await controller.createFeedback(feedbackData);
    expect(result).toEqual({ id: '1', message: 'Test feedback' });
    expect(mockFeedbackService.save).toHaveBeenCalledWith(feedbackData);
  });

  it('should update feedback', async () => {
    const updateData = { title: 'Updated title', rating: 4 };
    const result = await controller.updateFeedback('1', updateData);
    expect(result).toEqual({ id: '1', message: 'Updated feedback' });
    expect(mockFeedbackService.updateById).toHaveBeenCalledWith(
      '1',
      updateData,
    );
  });

  it('should delete feedback', async () => {
    const result = await controller.deleteFeedbackById('1');
    expect(result).toEqual({ id: '1', message: 'Deleted feedback' });
    expect(mockFeedbackService.deleteById).toHaveBeenCalledWith('1');
  });
});
