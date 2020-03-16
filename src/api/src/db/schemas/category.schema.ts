import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

export const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const CategorySchemaName = 'Category';
export const CategoryModel = mongoose.model<ICategory>(CategorySchemaName, CategorySchema);
