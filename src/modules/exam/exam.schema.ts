import { Schema, SchemaTypes, Document, Model, Connection } from 'mongoose';
import { CategoryModel } from '../category/category.model';

interface Exam extends Document {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly imagePublicId: string;
  readonly category: string | Partial<CategoryModel>; // Đảm bảo kiểu dữ liệu chính xác
  deleteAt: Date;
}

type ExamModel = Model<Exam>;

const ExamSchema = new Schema<Exam>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    category: { type: SchemaTypes.ObjectId, ref: 'Category', required: true },
    deleteAt: { type: SchemaTypes.Date, default: null },
  },
  { timestamps: true },
);

// Đảm bảo export schema
export { ExamSchema, Exam, ExamModel };
