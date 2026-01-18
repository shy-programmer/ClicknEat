import { Document, Model } from 'mongoose';
export interface IItem extends Document {
    name: string;
    price: number;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Item: Model<IItem>;
//# sourceMappingURL=item.model.d.ts.map