import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { Contact } from '../../modules/contact/contact.model';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { RoleType } from '../../shared/enum/role.type.enum';
import { Responser } from '../../decorators/responser.decorator';

@ApiTags('Contact')
@ApiBearerAuth()
@Controller({ path: 'contacts', scope: Scope.REQUEST })
export class ContactController {
  constructor(private contactService: ContactService) {} // Đã sửa từ contactSerivce thành contactService

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  getAllContacts(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Contact[]> {
    return this.contactService.findAll(keyword, skip, limit); // Sử dụng contactService
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async getContactById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Contact> {
    const contact = await this.contactService.findById(id);
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  @Post('')
  async createContact(@Body() contact: CreateContactDTO): Promise<Contact> {
    return this.contactService.save(contact);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async updateContact(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() contact: UpdateContactDTO,
  ): Promise<Contact> {
    const updatedContact = await this.contactService.updateById(id, contact);
    if (!updatedContact) {
      throw new NotFoundException('Contact not found');
    }
    return updatedContact;
  }

  @Delete(':id')
  @Responser.handle('Delete contact')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  async deleteContactById(@Param('id', ParseObjectIdPipe) id: string) {
    const result = await this.contactService.deleteById(id);
    if (!result) {
      throw new NotFoundException('Contact not found'); // Thêm kiểm tra để ném ra NotFoundException
    }
    return { message: 'Contact deleted successfully', success: true }; // Trả về success: true
  }
}
