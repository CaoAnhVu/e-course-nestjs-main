import { Connection, Document, Model } from 'mongoose';
interface Category extends Document {
    readonly category: string;
    deleteAt: Date;
}
type CategoryModel = Model<Category>;
declare const createCategoryModel: (conn: Connection) => CategoryModel;
export { Category, CategoryModel, createCategoryModel };
