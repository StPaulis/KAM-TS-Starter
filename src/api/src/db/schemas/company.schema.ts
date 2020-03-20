import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logoUrl: string;
  email: string;
  categories: string[];
}

export const CompanySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String, required: true },
  email: { type: String },
  categories: [{ type: String }],
});

export const CompanySchemaName = 'Company';
export const CompanyModel = mongoose.model<ICompany>(CompanySchemaName, CompanySchema);
