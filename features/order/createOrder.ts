import {createAsyncThunk} from "@reduxjs/toolkit"
import {Order, OrderItem} from "../../types/Order"

type ReturnedType = OrderItem[]

export const createOrder = createAsyncThunk<ReturnedType, Order>(
    "order/create",
    async (signal) => {
        try {
            const response = await fetch(`http://127.0.0.1:8787/order/`, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signal)
            })
            return await response.json()
        } catch (e) {
            // @ts-ignore
            return e.message
        }
    }
)

export default createOrder