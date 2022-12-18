import {ProductCart} from "./Product"

export interface Order {
    delivery_type: string,
    delivery_address: {
        lat: number | null,
        lng: number | null
    },
    payment_type: string,
    user: {
        name: string,
        number: string
    },
    order_items: ProductCart[]
}

export interface OrderItem {
    name: string
    product_id: string
    quantity: {low: number, high: number}
    price: {low: number, high: number}
    created_at: string
}