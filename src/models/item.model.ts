import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IItem extends Document {
  name: string;
  price: number;
  isAvailable: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const itemSchema: Schema<IItem> = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true } 
);

export const Item: Model<IItem> = mongoose.model<IItem>('Item', itemSchema);

