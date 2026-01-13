import { ISession } from "../models/session.model.js";
declare class SessionService {
    getOrCreateSession(sessionId: string): Promise<ISession>;
    updateSessionState(sessionId: string, newState: ISession["state"]): Promise<ISession | {
        code: number;
        message: string;
    }>;
    updateSessionChoiceMap(sessionId: string, choiceMap: Record<string, string>): Promise<ISession | {
        code: number;
        message: string;
    }>;
    setCurrentOrderId(sessionId: string, orderId: string): Promise<ISession | {
        code: number;
        message: string;
    }>;
}
export declare const sessionService: SessionService;
export {};
//# sourceMappingURL=session.service.d.ts.map