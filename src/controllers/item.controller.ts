import { Request, Response } from "express";
import { itemService } from "../services/item.service.js";

class ItemController {
    async createItem(req: Request, res: Response) {
        try {
            const { name, price, isAvailable } = req.body;

            if (!name || price === undefined) {
                return res.status(400).json({
                    message: "Name and price are required"
                });
            }

            const item = await itemService.createItem(
                name,
                Number(price),
                isAvailable
            );

            res.status(201).json({
                message: "Item created successfully",
                data: item
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Failed to create item"
            });
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const { itemId } = req.params as { itemId: string };
            const updateData = req.body;

            const updatedItem = await itemService.updateItem(itemId, updateData);

            res.status(200).json({
                message: "Item updated successfully",
                data: updatedItem
            });
        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async getAllItems(_req: Request, res: Response) {
        try {
            const items = await itemService.getAllItems();

            res.status(200).json({
                data: items,
                message: "All items fetched successfully"
            });
        } catch {
            res.status(500).json({
                message: "Failed to fetch items"
            });
        }
    }

    async getAvailableItems(_req: Request, res: Response) {
        try {
            const items = await itemService.getAvailableItems();

            res.status(200).json({
                data: items,
                message: "Item fetched successfully"
            });
        } catch {
            res.status(500).json({
                message: "Failed to fetch available items"
            });
        }
    }

    async getItemById(req: Request, res: Response) {
        try {
            const { itemId } = req.params as { itemId: string };

            const item = await itemService.getItemById(itemId);

            res.status(200).json({
                data: item
            });
        } catch (error: any) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    async toggleItemAvailability(req: Request, res: Response) {
        try {
            const { itemId } = req.params as { itemId: string };

            const item = await itemService.toggleItemAvailability(itemId);

            res.status(200).json({
                message: "Item availability updated",
                data: item
            });
        } catch (error: any) {
            res.status(404).json({
                message: error.message
            });
        }
    }
}

export default new ItemController();
