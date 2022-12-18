import React from "react"
import {ProductCart} from "../../types/Product"
import styles from "./CartProductBlock.module.css"
import cn from "classnames"
import {useDispatch} from "../../store"
import {addQuantity, minusQuantity} from "../../features/products/productSlice"

interface CartProductBlockProps {
    product: ProductCart
}

const CartProductBlock: React.FC<CartProductBlockProps> = ({product}) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.imgWrapper}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.rightBlock}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.price}>{product.salePrice ? product.salePrice : product.price} BYN {product.quantity > 1 && `x ${product.quantity}`}</p>
                <div className={styles.countWrapper}>
                    <p className={styles.count}>Количество: {product.quantity}</p>
                    <div className={styles.btns}>
                        <button onClick={() => dispatch(minusQuantity({_id: product._id}))} className={cn(styles.btn, styles.minus)}>-</button>
                        <button onClick={() => dispatch(addQuantity({_id: product._id}))} className={cn(styles.btn, styles.plus)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProductBlock