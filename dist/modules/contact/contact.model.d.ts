import { Connection, Document, Model } from 'mongoose';
interface Contact extends Document {
    readonly fullName: string;
    readonly mail: string;
    readonly text: string;
    readonly topic: string;
    readonly watched: Boolean;
    deleteAt: Date;
}
type ContactModel = Model<Contact>;
declare const createContactModel: (conn: Connection) => ContactModel;
export { Contact, ContactModel, createContactModel };
