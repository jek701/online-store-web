import {useDispatch as useStoreDispatch} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
import {productApi} from "./features/products/productApi"
import productSlice from "./features/products/productSlice"
import {persistCombineReducers, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "product-root",
    storage
}

const persistedCombineReducers = persistCombineReducers(persistConfig, {
    [productApi.reducerPath]: productApi.reducer,
    productSlice
})

// Типизация state
export type StoreState = ReturnType<typeof store.getState>
// Типизация dispatch
export type AppDispatch = typeof store.dispatch

// Типизация App Thunk
export interface AppThunkProps {
    dispatch: AppDispatch;
    state: StoreState;
    extra?: unknown;
    rejectValue?: unknown;
}

// Настройка dispatch
export const useDispatch = () => useStoreDispatch<AppDispatch>()
// Настройка store
export const store = configureStore({
    reducer: persistedCombineReducers,
    // @ts-ignore
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false
        }).concat(productApi.middleware)
})

export const persistor = persistStore(store)