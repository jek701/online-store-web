import React from "react"
import {Product} from "../../types/Product"

interface ProductWrapperProps {
    product: Product
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({product}) => {
    return (
        <div>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.salePrice}</p>
        </div>
    )
}

export default ProductWrapper