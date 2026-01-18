import { Request, Response } from "express";
declare class ItemController {
    createItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateItem(req: Request, res: Response): Promise<void>;
    getAllItems(_req: Request, res: Response): Promise<void>;
    getAvailableItems(_req: Request, res: Response): Promise<void>;
    getItemById(req: Request, res: Response): Promise<void>;
    toggleItemAvailability(req: Request, res: Response): Promise<void>;
}
declare const _default: ItemController;
export default _default;
//# sourceMappingURL=item.controller.d.ts.map