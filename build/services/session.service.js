import { Session } from "../models/session.model.js";
class SessionService {
    async getOrCreateSession(sessionId) {
        let session = await Session.findOne({ sessionId });
        if (!session) {
            session = await Session.create({ sessionId });
        }
        return session;
    }
    async updateSessionState(sessionId, newState) {
        const session = await Session.findOneAndUpdate({ sessionId }, { state: newState }, { new: true });
        if (!session) {
            return {
                code: 404,
                message: "Session not found"
            };
        }
        return session;
    }
    async updateSessionChoiceMap(sessionId, choiceMap) {
        const session = await Session.findOneAndUpdate({ sessionId }, { choiceMap }, { new: true });
        if (!session) {
            return {
                code: 404,
                message: "Session not found"
            };
        }
        return session;
    }
    async setCurrentOrderId(sessionId, orderId) {
        const session = await Session.findOneAndUpdate({ sessionId }, { currentOrderId: orderId }, { new: true });
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
//# sourceMappingURL=session.service.js.map