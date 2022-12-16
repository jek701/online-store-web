import React from "react"
import {useGetProductQuery} from "../features/products/productApi"
import ProductWrapper from "../components/product/ProductWrapper"

const Product = () => {
    // @ts-ignore
    const {data, isLoading, isSuccess} = useGetProductQuery()

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && data && data.map((product) => <ProductWrapper product={product}/>)}
        </div>
    )
}

export default Product