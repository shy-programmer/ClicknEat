import { IItem } from "../models/item.model.js";
import { IOrder } from "../models/order.model.js";
type MenuResponse = {
    message: string;
    choiceMap: Record<string, string>;
};
declare class MenuBuilder {
    buildMainMenu(): Promise<MenuResponse>;
    buildItemSelectionMenu(items: IItem[]): Promise<MenuResponse>;
    buildItemAddedMenu(item: IItem): Promise<MenuResponse>;
    buildOrderCheckoutMenu(total: number): Promise<MenuResponse>;
    buildPaymentMenu(authorizationUrl: string): Promise<MenuResponse>;
    buildOrderHistoryMenu(orders: IOrder[]): Promise<MenuResponse>;
    buildCurrentOrderMenu(order: IOrder): Promise<MenuResponse>;
    buildInvalidOptionMenu(): Promise<MenuResponse>;
}
export declare const menuBuilder: MenuBuilder;
export {};
//# sourceMappingURL=menuBuilder.d.ts.map