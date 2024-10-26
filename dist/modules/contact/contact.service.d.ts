import { Model } from 'mongoose';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { Contact } from '../../modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
export declare class ContactService {
    private contactModel;
    private req;
    constructor(contactModel: Model<Contact>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<Contact[]>;
    findById(id: string): Promise<Contact>;
    save(data: CreateContactDTO): Promise<Contact>;
    updateById(id: string, data: UpdateContactDTO): Promise<Contact>;
    deleteById(id: string): Promise<Contact>;
    softRemove(value: Contact): Promise<Contact>;
}
