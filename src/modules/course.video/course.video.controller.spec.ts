import { Test, TestingModule } from '@nestjs/testing';
import { CourseVideoController } from './course.video.controller';
import { CourseVideoService } from './course.video.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { getModelToken } from '@nestjs/mongoose'; // Import getModelToken
import { CloudinaryService } from '../../processors/helper/helper.service.cloudinary';

describe('CourseVideoController', () => {
  let controller: CourseVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseVideoController],
      providers: [
        CourseVideoService,
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
          provide: getModelToken('CourseVideo'), // Mock cho COURSE_VIDEO_MODEL
          useValue: {
            find: jest.fn(() => []), // Thêm các phương thức mock cho mô hình nếu cần
            create: jest.fn(() => ({})),
          },
        },
        {
          provide: CloudinaryService, // Mock CloudinaryService
          useValue: {
            uploadImage: jest.fn(() => ({ url: 'mockImageUrl' })),
          },
        },
        {
          provide: 'COURSE_VIDEO_MODEL', // Mock provider for COURSE_VIDEO_MODEL
          useValue: {}, // Add mock methods if necessary
        },
      ],
    }).compile();

    controller = await module.resolve<CourseVideoController>(
      CourseVideoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
