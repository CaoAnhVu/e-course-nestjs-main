import { Connection, Document, Model } from 'mongoose';
import { CategoryModel } from '../category/category.model';
interface Exam extends Document {
    readonly title: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly imagePublicId: string;
    readonly category: Partial<CategoryModel>;
    deleteAt: Date;
}
type ExamModel = Model<Exam>;
declare const createExamModel: (conn: Connection) => ExamModel;
export { Exam, ExamModel, createExamModel };
