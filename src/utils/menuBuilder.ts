import {IItem} from "../models/item.model";
import {IOrder, IOrderItem} from "../models/order.model";
import {ISession} from "../models/session.model";

type returnedValue = {
    message: string,
    choiceMap: Record<string, string>
};

export class menuBuilder {
    async buildMainMenu(): Promise<returnedValue> {
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
        }
    }

    async buildItemSelectionMenu(items: IItem[]): Promise<returnedValue> {
        let message = `Please select an item to add to your order:\n`;
        const choiceMap: Record<string, string> = {};
        items.forEach((item, i) => {
            const choiceNumber = i + 1;
            message += `Select ${choiceNumber} for ${item.name} - $${item.price}\n`;
            choiceMap[choiceNumber.toString()] = item._id.toString();
        });
        message += `Select 0 to go back to main menu.`;
        choiceMap["0"] = "MAIN_MENU";
        return { message, choiceMap };
    }

    async buildItemAddedMenu(item: IItem): Promise<returnedValue> {
        const message = `${item.name} has been added to your order.\n
        Select 1 to add more items.\n
        Select 99 to checkout order.\n
        Select 10 to cancel order.\n
        Select 0 to go back to main menu.`;
        const choiceMap: Record<string, string> = {
            "1": "ITEM_SELECTION",
            "99": "CHECKOUT_ORDER",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }

    async buildOrderCheckoutMenu(total: number): Promise<returnedValue> {
        const message = `Your order total is $${total}.\n
        Select 1 to proceed to payment.\n
        Select 10 to cancel order.\n
        Select 0 to go back to main menu.`;
        const choiceMap: Record<string, string> = {
            "1": "MAKING_PAYMENT",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }

    async buildOrderHistoryMenu(orders: IOrder[]): Promise<returnedValue> {
        let message = `Your Order History:\n`;
        orders.forEach((order, i) => {
            message += `Order ${i + 1} [${order.items}] - $${order.total} - ${order.status}\n\n`;
        });
        message += `Select 0 to go back to main menu.`;
        const choiceMap: Record<string, string> = {
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }

    async buildCurrentOrderMenu(order: IOrder): Promise<returnedValue> {
        let message = `Your Current Order:\n`;
        order.items.forEach((orderItem, i) => {
            message += `Item ${i + 1} [${orderItem.itemId}] x${orderItem.quantity}\n`;
        });
        message += `Total: $${order.total}\n\n
        Select 99 to checkout order.\n
        Select 10 to cancel order.\n
        Select 0 to go back to main menu.`;
        const choiceMap: Record<string, string> = {
            "99": "CHECKOUT_ORDER",
            "10": "CANCEL_ORDER",
            "0": "MAIN_MENU"
        };
        return { message, choiceMap };
    }

    async buildInvalidOptionMenu(): Promise<returnedValue> {
        return {
            message: `Invalid option selected. Please try again.`,
            choiceMap: {}
        };
    }
    }
