import { Request, Response } from "express";
interface ChatRequestBody {
    sessionId: string;
    text?: string;
}
export declare const ChatHandlerController: (req: Request<{}, {}, ChatRequestBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=chatHandler.controller.d.ts.map