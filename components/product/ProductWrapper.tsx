import React from "react"
import styles from "./ProductWrapper.module.css"
import {Product} from "../../types/Product"
import ProductBlock from "./ProductBlock"

interface ProductWrapperProps {
    products: Product[]
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({products}) => {
    return (
        <div className={styles.wrapper}>
            {products.map((product) => <ProductBlock product={product}/>)}
        </div>
    )
}

export default ProductWrapper