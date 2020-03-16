import mongoose, { Schema, Document, } from 'mongoose';
import { ICategory } from './category.schema';

export interface ICompany extends Document {
  name: string;
  logoUrl: string;
  email: string;
  categories: ICategory['_id'][];
}

export const CompanySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String, required: true },
  email: { type: String },
  categories: [{ type: Schema.Types.ObjectId }],
});

export const CompanySchemaName = 'Company';
export const CompanyModel = mongoose.model<ICompany>(CompanySchemaName, CompanySchema);
