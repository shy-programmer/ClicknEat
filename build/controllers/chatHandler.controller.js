import { sessionService } from "../services/session.service.js";
import { itemService } from "../services/item.service.js";
import { orderService } from "../services/order.service.js";
import { paymentService } from "../services/payment.service.js";
import { menuBuilder } from "../utils/menuBuilder.js";
export const ChatHandlerController = async (req, res) => {
    try {
        const { sessionId, text } = req.body;
        const session = await sessionService.getOrCreateSession(sessionId);
        if (session.currentOrderId) {
            const order = await orderService.getOrderById(session.currentOrderId);
            if (order?.status === "paid") {
                await sessionService.clearCurrentOrderId(sessionId);
                const menu = await menuBuilder.buildMainMenu();
                session.state = "MAIN_MENU";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.json({
                    response: `✅ Payment successful!\nYour order has been confirmed 🍽️\n\n${menu.message}`
                });
            }
        }
        if (!text) {
            const menu = await menuBuilder.buildMainMenu();
            session.state = "MAIN_MENU";
            session.choiceMap = menu.choiceMap;
            await session.save();
            return res.status(200).json({
                response: menu.message
            });
        }
        const action = session.choiceMap[text];
        if (session.state === "SCHEDULE_ORDER" && action !== "MAIN_MENU") {
            const scheduledDate = new Date(text);
            const currentOrder = await orderService.getCurrentOrder(sessionId);
            if (!currentOrder) {
                const menu = await menuBuilder.buildMainMenu();
                session.state = "MAIN_MENU";
                session.choiceMap = menu.choiceMap;
                await session.save();
                const response = `No current order found. Returning to main menu.\n\n${menu.message}`;
                return res.status(200).json({
                    response
                });
            }
            await orderService.scheduleOrder(currentOrder._id.toString(), scheduledDate);
            const menu = await menuBuilder.buildScheduledConfirmationMenu(scheduledDate);
            session.state = "MAKING_PAYMENT";
            session.choiceMap = menu.choiceMap;
            await session.save();
            return res.status(200).json({
                response: menu.message
            });
        }
        if (!action) {
            const invalidMenu = await menuBuilder.buildInvalidOptionMenu();
            return res.status(200).json({
                response: invalidMenu.message
            });
        }
        if (session.state === "ITEM_SELECTION" && action !== "MAIN_MENU") {
            const itemId = action;
            const item = await itemService.getItemById(itemId);
            if (!item) {
                const invalidMenu = await menuBuilder.buildInvalidOptionMenu();
                return res.status(200).json({ response: invalidMenu.message });
            }
            if (!session.currentOrderId) {
                const newOrder = await orderService.createOrder(sessionId, {
                    itemId: item._id,
                    quantity: 1
                });
                const orderId = newOrder._id.toString();
                if (!orderId) {
                    const invalidMenu = await menuBuilder.buildInvalidOptionMenu();
                    return res.status(200).json({ response: invalidMenu.message });
                }
                await sessionService.setCurrentOrderId(sessionId, orderId);
                const menu = await menuBuilder.buildItemAddedMenu(item);
                session.state = "ITEM_ADDED";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            else {
                await orderService.addItemsToOrder(session.currentOrderId, {
                    itemId: item._id,
                    quantity: 1
                });
                const menu = await menuBuilder.buildItemAddedMenu(item);
                session.state = "ITEM_ADDED";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
        }
        switch (action) {
            case "ITEM_SELECTION": {
                const items = await itemService.getAvailableItems();
                const menu = await menuBuilder.buildItemSelectionMenu(items);
                session.state = "ITEM_SELECTION";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "MAIN_MENU": {
                const menu = await menuBuilder.buildMainMenu();
                session.state = "MAIN_MENU";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "CHECKOUT_ORDER": {
                if (!session.currentOrderId) {
                    const menu = await menuBuilder.buildMainMenu();
                    session.state = "MAIN_MENU";
                    session.choiceMap = menu.choiceMap;
                    await session.save();
                    const response = `No order to place. Returning to main menu.\n\n${menu.message}`;
                    return res.status(200).json({
                        response
                    });
                }
                const currentOrder = await orderService.getCurrentOrder(sessionId);
                const menu = await menuBuilder.buildOrderCheckoutMenu(currentOrder.total);
                session.state = "CHECKOUT_ORDER";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "ORDER_HISTORY": {
                const orderHistory = await orderService.getOrderHistory(sessionId);
                const orders = orderHistory;
                const menu = await menuBuilder.buildOrderHistoryMenu(orders);
                session.state = "ORDER_HISTORY";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "CURRENT_ORDER": {
                if (!session.currentOrderId) {
                    const menu = await menuBuilder.buildMainMenu();
                    session.state = "MAIN_MENU";
                    session.choiceMap = menu.choiceMap;
                    await session.save();
                    const response = `No current order found. Returning to main menu.\n\n${menu.message}`;
                    return res.status(200).json({
                        response
                    });
                }
                const currentOrder = (await orderService.getCurrentOrder(sessionId));
                if (!currentOrder) {
                    const menu = await menuBuilder.buildMainMenu();
                    session.state = "MAIN_MENU";
                    session.choiceMap = menu.choiceMap;
                    await session.save();
                    const response = `No current order found. Returning to main menu.\n\n${menu.message}`;
                    return res.status(200).json({
                        response
                    });
                }
                const menu = await menuBuilder.buildCurrentOrderMenu(currentOrder);
                session.state = "CURRENT_ORDER";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "MAKING_PAYMENT": {
                if (!session.currentOrderId) {
                    const menu = await menuBuilder.buildMainMenu();
                    session.state = "MAIN_MENU";
                    session.choiceMap = menu.choiceMap;
                    await session.save();
                    const response = `No current order found. Returning to main menu.\n\n${menu.message}`;
                    return res.status(200).json({
                        response
                    });
                }
                const currentOrder = await orderService.getCurrentOrder(sessionId);
                if (!currentOrder.paymentReference) {
                    await paymentService.initializePayment(currentOrder);
                }
                const paidOrder = await orderService.getOrderById(currentOrder._id.toString());
                const paymentLink = paidOrder.paymentLink;
                const menu = await menuBuilder.buildPaymentMenu(paymentLink);
                session.state = "MAKING_PAYMENT";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "SCHEDULE_ORDER": {
                if (!session.currentOrderId) {
                    const menu = await menuBuilder.buildMainMenu();
                    session.state = "MAIN_MENU";
                    session.choiceMap = menu.choiceMap;
                    await session.save();
                    const response = `No current order found. Returning to main menu.\n\n${menu.message}`;
                    return res.status(200).json({
                        response
                    });
                }
                const menu = await menuBuilder.buildScheduleOrderMenu();
                session.state = "SCHEDULE_ORDER";
                session.choiceMap = menu.choiceMap;
                await session.save();
                return res.status(200).json({
                    response: menu.message
                });
            }
            case "CANCEL_ORDER": {
                const menu = await menuBuilder.buildMainMenu();
                session.state = "MAIN_MENU";
                session.choiceMap = menu.choiceMap;
                await session.save();
                let response;
                if (session.currentOrderId) {
                    await orderService.cancelOrder(session.currentOrderId);
                    await sessionService.clearCurrentOrderId(sessionId);
                    response = `Your order has been cancelled. Returning to main menu.\n\n${menu.message}`;
                }
                else {
                    response = `No current order to cancel. Returning to main menu.\n\n${menu.message}`;
                }
                return res.status(200).json({
                    response
                });
            }
            default: {
                const invalidMenu = await menuBuilder.buildInvalidOptionMenu();
                return res.status(200).json({
                    response: invalidMenu.message
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};
//# sourceMappingURL=chatHandler.controller.js.map