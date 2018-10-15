import { Product } from "./product";

export class ShoppingCartItem {

    $key: string;
    title: String;
    photo1small: String;
    photo1big: String;
    photo2small: String;
    price: number;
    quantity: number;
    discount: number;
    sale: boolean;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        let dis = 1 - this.discount / 100; 
        return this.price * dis * this.quantity;
    }
}