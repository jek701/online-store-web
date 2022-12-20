import {Product} from "../../types/Product"
import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8787"}),
    endpoints: (builder) => ({
        getProduct: builder.query<Product[], undefined>({
            query: () => "/product"
        }),
        // Вывод отзыва по id
        getProductById: builder.query<Product, string>({
            query: (id) => `/product/${id}`
        })
    })
})

export const {useGetProductQuery, useGetProductByIdQuery} = productApi
