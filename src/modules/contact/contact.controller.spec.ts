import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
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
          provide: ContactService,
          useValue: {
            findAll: jest.fn(() => [{ id: 1, name: 'Test Contact' }]),
            findById: jest.fn((id: string) => ({ id, name: 'Test Contact' })),
            save: jest.fn((contact: CreateContactDTO) => ({
              id: 1,
              ...contact,
            })),
            updateById: jest.fn((id: string, contact: UpdateContactDTO) => ({
              id,
              ...contact,
            })),
            deleteById: jest.fn(async (id: string) =>
              id === '1' ? true : false,
            ), // Cập nhật trả về boolean
          },
        },
      ],
    }).compile();

    controller = await module.resolve<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all contacts', async () => {
    const result = await controller.getAllContacts();
    expect(result).toEqual([{ id: 1, name: 'Test Contact' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a contact by id', async () => {
    const result = await controller.getContactById('1');
    expect(result).toEqual({ id: '1', name: 'Test Contact' });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should create a contact', async () => {
    const newContact: CreateContactDTO = {
      fullName: 'New Contact',
      mail: 'test@example.com',
      text: 'Hello',
      topic: 'Inquiry',
    };
    const result = await controller.createContact(newContact);
    expect(result).toEqual({ id: 1, ...newContact });
    expect(service.save).toHaveBeenCalledWith(newContact);
  });

  it('should update a contact', async () => {
    const updatedContact: UpdateContactDTO = {
      fullName: 'Updated Contact',
      mail: 'updated@example.com',
      text: 'Hi',
      topic: 'Feedback',
    };
    const result = await controller.updateContact('1', updatedContact);
    expect(result).toEqual({ id: '1', ...updatedContact });
    expect(service.updateById).toHaveBeenCalledWith('1', updatedContact);
  });

  it('should delete a contact', async () => {
    const result = await controller.deleteContactById('1');
    expect(result).toEqual({
      message: 'Contact deleted successfully',
      success: true,
    });
    expect(service.deleteById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if contact not found on update', async () => {
    jest.spyOn(service, 'updateById').mockReturnValue(Promise.resolve(null));
    await expect(
      controller.updateContact('2', {
        fullName: 'Not Found',
        mail: 'notfound@example.com',
        text: 'Nope',
        topic: 'Feedback',
      }),
    ).rejects.toThrow('Contact not found');
  });

  it('should throw NotFoundException if contact not found on delete', async () => {
    jest.spyOn(service, 'deleteById').mockReturnValue(Promise.resolve(false)); // Trả về false khi không tìm thấy contact
    await expect(controller.deleteContactById('2')).rejects.toThrow(
      'Contact not found',
    );
  });
});
