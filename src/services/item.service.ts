import { Item, IItem } from "../models/item.model";

export class ItemService {
    async createItem(name: string, price: number, isAvailable: boolean = true) {
        const newItem: IItem = await Item.create({ name, price, isAvailable });
        return {
            code: 201,
            data: newItem,
            message: "Item created successfully"
        };
    }

    async updateItem(itemId: string, updateData: Partial<IItem>) {
        const {name, price} = updateData;
        if (!name && !price) {
            return {
                code: 400,
                message: "No valid fields to update"
            };
        }
        const updatedItem: IItem | null = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
        if (!updatedItem) {
            return {
                code: 404,
                message: "Item not found"
            };
        }
        return {
            code: 200,
            data: updatedItem,
            message: "Item updated successfully"
        };
    }
    
    async getAllItems() {
        const items: IItem[] = await Item.find();
        return {
            code: 200,
            data: items,
            message: "All Items retrieved successfully"
        };
    }
    
    async getAvailableItems() {
        const items: IItem[] = await Item.find({ isAvailable: true });
        return {
            code: 200,
            data: items,
            message: "Available Items retrieved successfully"
        };
    }

    async getItemById(itemId: string) {
        const item: IItem | null = await Item.findById(itemId);
        if (!item) {
            return {
                code: 404,
                message: "Item not found"
            };
        }
        return {
            code: 200,
            data: item,
            message: "Item retrieved successfully"
        };
    }

    async toggleItemAvailability(itemId: string) {
        const item: IItem | null = await Item.findById(itemId);
        if (!item) {
            return {
                code: 404,
                message: "Item not found"
            };
        }
        item.isAvailable = !item.isAvailable;
        await item.save();
        return {
            code: 200,
            data: item,
            message: `Item availability toggled to ${item.isAvailable}`
        };
    }
}