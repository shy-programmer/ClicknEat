import {Session, ISession} from "../models/session.model.js";

class SessionService {
    async getOrCreateSession(sessionId: string) {
        let session: ISession | null = await Session.findOne({ sessionId });
        if (!session) {
            session = await Session.create({ sessionId }); 
        }
        return session
    }

    async updateSessionState(sessionId: string, newState: ISession["state"]) {
        const session: ISession | null = await Session.findOneAndUpdate(
            { sessionId },
            { state: newState },
            { new: true }
        );
        if (!session) {
            return {
                code: 404,
                message: "Session not found"
            };
        }
        return session;
    }

    async updateSessionChoiceMap(sessionId: string, choiceMap: Record<string, string>) {
        const session: ISession | null = await Session.findOneAndUpdate(
            { sessionId },
            { choiceMap },
            { new: true }
        ); 
        if (!session) {
            return {
                code: 404,
                message: "Session not found"
            };
        }
        return session;
    }

    async setCurrentOrderId(sessionId: string, orderId: string) {
        const session: ISession | null = await Session.findOneAndUpdate(
            { sessionId },
            { currentOrderId: orderId },
            { new: true }
        );
        if (!session) {
            return {
                code: 404,
                message: "Session not found"
            };
        }
        return session;
    }
    
}

export const sessionService = new SessionService();