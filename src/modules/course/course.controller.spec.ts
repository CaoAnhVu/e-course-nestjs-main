import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service'; // Đảm bảo bạn import đúng đường dẫn
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Đảm bảo bạn import đúng đường dẫn

describe('CourseController', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: {
            // Mock các method mà bạn sử dụng trong CourseService (nếu cần)
            findAll: jest.fn(() => []),
            findOne: jest.fn((id) => ({ id })),
            // Các method khác
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockJwtToken'),
          },
        },
        {
          provide: UserService,
          useValue: {
            // Mock các method của UserService
            findUserById: jest.fn((id) => ({ id, name: 'Test User' })),
            // Các method khác nếu cần
          },
        },
      ],
    }).compile();

    controller = await module.resolve<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
