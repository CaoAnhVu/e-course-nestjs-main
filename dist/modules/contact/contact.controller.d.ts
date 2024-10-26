import { ContactService } from './contact.service';
import { Contact } from '../../modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
export declare class ContactController {
    private contactSerivce;
    constructor(contactSerivce: ContactService);
    getAllContacts(keyword?: string, limit?: number, skip?: number): Promise<Contact[]>;
    getContactById(id: string): Promise<Contact>;
    createContact(contact: CreateContactDTO): Promise<Contact>;
    updateContact(id: string, contact: UpdateContactDTO): Promise<Contact>;
    deleteContactById(id: string): Promise<Contact>;
}
