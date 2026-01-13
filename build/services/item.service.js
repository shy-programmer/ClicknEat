import { Item } from "../models/item.model.js";
class ItemService {
    async createItem(name, price, isAvailable = true) {
        const newItem = await Item.create({ name, price, isAvailable });
        return newItem;
    }
    async updateItem(itemId, updateData) {
        const { name, price } = updateData;
        if (!name && !price) {
            throw new Error("No valid fields to update");
        }
        const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
        if (!updatedItem) {
            throw new Error("Item not found");
        }
        return updatedItem;
    }
    async getAllItems() {
        const items = await Item.find();
        return items;
    }
    async getAvailableItems() {
        const items = await Item.find({ isAvailable: true });
        return items;
    }
    async getItemById(itemId) {
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error("Item not found");
        }
        return item;
    }
    async toggleItemAvailability(itemId) {
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error("Item not found");
        }
        item.isAvailable = !item.isAvailable;
        await item.save();
        return item;
    }
}
export const itemService = new ItemService();
//# sourceMappingURL=item.service.js.map