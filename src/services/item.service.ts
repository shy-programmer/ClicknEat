import { it } from "node:test";
import { Item, IItem } from "../models/item.model";

class ItemService {
    async createItem(name: string, price: number, isAvailable: boolean = true) {
        const newItem: IItem = await Item.create({ name, price, isAvailable });
        return newItem
    }

    async updateItem(itemId: string, updateData: Partial<IItem>) {
        const {name, price} = updateData;
        if (!name && !price) {
            throw new Error("No valid fields to update");
        }
        const updatedItem: IItem | null = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
        if (!updatedItem) {
            throw new Error("Item not found");
        }
        return updatedItem;
    }
    
    async getAllItems() {
        const items: IItem[] = await Item.find();
        return items;
    }
    
    async getAvailableItems() {
        const items: IItem[] = await Item.find({ isAvailable: true });
        return items;
    }

    async getItemById(itemId: string) {
        const item: IItem | null = await Item.findById(itemId);
        if (!item) {
            throw new Error("Item not found");
        }
        return item;
    }

    async toggleItemAvailability(itemId: string) {
        const item: IItem | null = await Item.findById(itemId);
        if (!item) {
            throw new Error("Item not found");
        }
        item.isAvailable = !item.isAvailable;
        await item.save();
        return item;
    }
}

export const itemService = new ItemService();