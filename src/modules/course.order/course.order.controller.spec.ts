import { Test, TestingModule } from '@nestjs/testing';
import { CourseOrderController } from './course.order.controller';
import { CourseOrderService } from './course.order.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { getModelToken } from '@nestjs/mongoose';
import { CourseOrder } from './course.order.model';
import { Course } from '../course/course.model';
import { UserService } from '../user/user.service'; // Import UserService

describe('CourseOrderController', () => {
  let controller: CourseOrderController;
  let service: CourseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseOrderController],
      providers: [
        CourseOrderService,
        {
          provide: getModelToken('COURSE_ORDER_MODEL'),
          useValue: {}, // Mock implementation of CourseOrder model
        },
        {
          provide: getModelToken('Course'),
          useValue: {}, // Mock implementation of Course model
        },
        {
          provide: JwtService, // Add JwtService as a provider
          useValue: {}, // Mock implementation of JwtService
        },
        {
          provide: UserService, // Add UserService as a provider
          useValue: {}, // Mock implementation of UserService
        },
      ],
    }).compile();

    controller = await module.resolve<CourseOrderController>(
      CourseOrderController,
    );
    service = await module.resolve<CourseOrderService>(CourseOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
