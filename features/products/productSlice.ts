// Product Slice
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductCart} from "types/Product"
import {useSelector} from "react-redux"
import {StoreState} from "../../store"

interface ProductState {
    products: ProductCart[]
    selectedAddress: {
        lat: number | null
        lng: number | null
    }
}

const initialState: ProductState = {
    products: [],
    selectedAddress: {
        lat: null,
        lng: null
    }
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        deleteAllProducts(state) {
            state.products = []
        },
        addProduct(state, action: PayloadAction<ProductCart>) {
            if (state.products.find(i => i._id === action.payload._id)) {
                state.products.find(i => i._id === action.payload._id)!.quantity += action.payload.quantity
            } else {
                state.products.push(action.payload)
            }
        },
        addQuantity(state, action: PayloadAction<{ _id: string }>) {
            const index = state.products.findIndex(i => i._id === action.payload._id)
            state.products[index].quantity++
        },
        minusQuantity(state, action: PayloadAction<{ _id: string }>) {
            if (state.products.find(i => i._id === action.payload._id)?.quantity === 1) {
                state.products = state.products.filter(i => i._id !== action.payload._id)
            } else {
                const index = state.products.findIndex(i => i._id === action.payload._id)
                state.products[index].quantity--
            }
        },
        updateAddress: (state, action: PayloadAction<{lat: number | null, lng: number | null}>) => {
            state.selectedAddress.lat = action.payload.lat
            state.selectedAddress.lng = action.payload.lng
        },
    }
})

export const {
    addProduct,
    deleteAllProducts,
    addQuantity,
    minusQuantity,
    updateAddress
} = productSlice.actions

export default productSlice.reducer

export const useGetProducts = () => useSelector((state: StoreState) => state.productSlice)