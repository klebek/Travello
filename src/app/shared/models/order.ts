import { ShoppingCart } from "./shopping-cart";

export class Order {
    $key: string;
    orderId: string;
    datePlaced: number;
    items: any[];
    total: number;
    read: boolean;

    constructor(public userId: String, public shopping: any, shoppingCart: ShoppingCart) {
        this.orderId = Math.random().toString().substring(2,9).toUpperCase();
        this.datePlaced = new Date().getTime();
        this.read = false;
        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    photo1small: i.photo1small,
                    photo1big: i.photo1big,
                    photo2small: i.photo2small,
                    price: i.price,
                    discount: i.discount,
                    sale: i.sale
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
        
    }
}