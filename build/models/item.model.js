import mongoose, { Schema } from 'mongoose';
const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });
export const Item = mongoose.model('Item', itemSchema);
//# sourceMappingURL=item.model.js.map