class MenuBuilder {
    async buildMainMenu() {
        return {
            message: `Welcome to ClicknEat!\n
            Select 1 to Place an order\n
            Select 99 to checkout order\n
            Select 98 to see order history\n
            Select 97 to see current order\n
            Select 0 to cancel order`,
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
        let message = `Please select an item to add to your order:\n`;
        const choiceMap = {};
        items.forEach((item, i) => {
            const choiceNumber = i + 1;
            message += `Select ${choiceNumber} for ${item.name} - $${item.price}\n`;
            choiceMap[choiceNumber.toString()] = item._id.toString();
        });
        message += `Select 0 to go back to main menu.`;
        choiceMap["0"] = "MAIN_MENU";
        return { message, choiceMap };
    }
    async buildItemAddedMenu(item) {
        const message = `${item.name} has been added to your order.\n
        Select 1 to add more items.\n
        Select 99 to checkout order.\n
        Select 10 to cancel order.\n
        Select 0 to go back to main menu.`;
        const choiceMap = {
            "1": "ITEM_SELECTION",
            "99": "CHECKOUT_ORDER",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildOrderCheckoutMenu(total) {
        const message = `Your order total is $${total}.\n
        Select 1 to proceed to payment.\n
        Select 10 to cancel order.\n
        Select 0 to go back to main menu.`;
        const choiceMap = {
            "1": "MAKING_PAYMENT",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }
    async buildOrderHistoryMenu(orders) {
        let message = `Your Order History:\n`;
        orders.forEach((order, i) => {
            message += `Order ${i + 1} [${order.items}] - $${order.total} - ${order.status}\n\n`;
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
            message += `Item ${i + 1} [${orderItem.itemId}] x${orderItem.quantity}\n`;
        });
        message += `Total: $${order.total}\n\n
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