import { DocumentType } from '@typegoose/typegoose';
import type { Types } from 'mongoose';
export type MongooseDoc<T> = Omit<DocumentType<T>, '_id' | 'id'> & T & {
    _id: Types.ObjectId;
};
export type MongooseID = Types.ObjectId | string;
export type MongooseObjectID = Types.ObjectId;
export type WithID<T> = T & {
    _id: Types.ObjectId;
};
