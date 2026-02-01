class MenuBuilder {
    async buildMainMenu() {
        return {
            message: `Welcome to ClicknEat!\n
            Select an option:\n
            1 to Place an order\n
            99 to checkout order\n
            98 to see order history\n
            97 to see current order\n
            0 to cancel order`,
            choiceMap: {
                "1": "ITEM_SELECTION",
                "99": "CHECKOUT_ORDER",
                "98": "ORDER_HISTORY",
                "97": "CURRENT_ORDER",
                "0": "CANCEL_ORDER"
            }
        };
    }
    async buildItemSelectionMenu(items) {
        let message = `Please select an item to add to your order:\n\n`;
        const choiceMap = {};
        items.forEach((item, i) => {
            const choiceNumber = i + 1;
            message += `${choiceNumber} for ${item.name} - ₦${item.price}\n\n`;
            choiceMap[choiceNumber.toString()] = item._id.toString();
        });
        message += `Select 0 to go back to main menu.`;
        choiceMap["0"] = "MAIN_MENU";
        return { message, choiceMap };
    }
    async buildItemAddedMenu(item) {
        const message = `${item.name} has been added to your order.\n
        Select an option:\n
        1 to add more items.\n
        99 to checkout order.\n
        97 to see current order.\n
        10 to cancel order.\n
        0 to go back to main menu.`;
        const choiceMap = {
            "1": "ITEM_SELECTION",
            "99": "CHECKOUT_ORDER",
            "97": "CURRENT_ORDER",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildOrderCheckoutMenu(total) {
        const message = `Order placed.\n
        Your order total is ₦${total}.\n
        Select an option:\n
        1 to proceed to payment.\n
        2 to schedule delivery. \n
        97 to see current order.\n
        10 to cancel order.\n
        0 to go back to main menu.`;
        const choiceMap = {
            "1": "MAKING_PAYMENT",
            "2": "SCHEDULE_ORDER",
            "97": "CURRENT_ORDER",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildPaymentMenu(authorizationUrl) {
        const message = `To complete your payment, please visit the following URL:\n
        ${authorizationUrl} \n
        Select 0 to return to the main menu.`;
        const choiceMap = {
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildScheduleOrderMenu() {
        const message = `Please enter delivery time in this format: \n
        YYYY-MM-DD HH:mm \n
        Example: 2026-01-20 18:30 \n
        OR \n
        Select 0 to return to the main menu.`;
        const choiceMap = {
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    ;
    async buildScheduledConfirmationMenu(scheduledFor) {
        const message = `Your order has been scheduled for ${scheduledFor.toLocaleString()}.\n
        Select 1 to make payment now.\n
        0 to return to the main menu.`;
        const choiceMap = {
            "1": "MAKING_PAYMENT",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildOrderHistoryMenu(orders) {
        let message = `Your Order History:\n\n`;
        orders.forEach((order, i) => {
            const itemNames = order.items.map(oi => {
                return typeof oi.itemId === 'object' ? `${oi.itemId.name} x${oi.quantity}` : 'Unknown Item';
            }).join(", ");
            message += `${i + 1}: [${itemNames}] - ₦${order.total} - ${order.status}\n\n`;
        });
        message += `Select 0 to go back to main menu.`;
        const choiceMap = {
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildCurrentOrderMenu(order) {
        let message = `Your Current Order:\n`;
        order.items.forEach((orderItem, i) => {
            const itemName = typeof orderItem.itemId === 'object' ? orderItem.itemId.name : 'Unknown Item';
            const itemPrice = typeof orderItem.itemId === 'object' ? orderItem.itemId.price : 0;
            message += `Item ${i + 1}: ${itemName} - ₦${itemPrice} x ${orderItem.quantity}\n`;
        });
        message += `Total: ₦${order.total}\n\n
        Select 99 to checkout order.\n
        Select 10 to cancel order.\n
        Select 0 to go back to main menu.`;
        const choiceMap = {
            "99": "CHECKOUT_ORDER",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildInvalidOptionMenu() {
        return {
            message: `Invalid option selected. Please try again.`,
            choiceMap: {}
        };
    }
}
export const menuBuilder = new MenuBuilder();
//# sourceMappingURL=menuBuilder.js.map