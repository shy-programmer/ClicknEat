import { IItem } from "../models/item.model.js";
declare class ItemService {
    createItem(name: string, price: number, isAvailable?: boolean): Promise<IItem>;
    updateItem(itemId: string, updateData: Partial<IItem>): Promise<IItem>;
    getAllItems(): Promise<IItem[]>;
    getAvailableItems(): Promise<IItem[]>;
    getItemById(itemId: string): Promise<IItem>;
    toggleItemAvailability(itemId: string): Promise<IItem>;
}
export declare const itemService: ItemService;
export {};
//# sourceMappingURL=item.service.d.ts.map