import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { UserService } from './user.service'; // Import UserService
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockJwtToken'), // Mock cho sign
            verify: jest.fn(() => ({ userId: 1 })), // Mock cho verify
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(() => ({ id: 1, name: 'Test User' })), // Mock UserService
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true), // Mock guard để pass qua
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
