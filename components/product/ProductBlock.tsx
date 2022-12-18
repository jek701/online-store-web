import React from "react"
import {Product, ProductCart} from "../../types/Product"
import {returnStringInArray} from "../../utils/returnStringInArray"
import styles from "./ProductBlock.module.css"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay, Lazy, Pagination} from "swiper"
import "swiper/swiper.min.css"
import "swiper/css/pagination"
import Button from "../button/Button"
import {priceReturn} from "../../utils/priceReturn"
import {addProduct, useGetProducts} from "../../features/products/productSlice"
import {useDispatch} from "../../store"
import {notification} from "antd"
import {ShoppingCartOutlined} from "@ant-design/icons"
import {NotificationPlacement} from "antd/es/notification/interface"

interface ProductWrapperProps {
    product: Product
}

const ProductBlock: React.FC<ProductWrapperProps> = ({product}) => {
    const [api, contextHolder] = notification.useNotification()
    const dispatch = useDispatch()

    const openNotification = (placement: NotificationPlacement, product: string) => {
        api.info({
            duration: 2,
            message: <p>Товар <strong>{product}</strong> добавлен в корзину</p>,
            placement
        })
    }

    const addToCartHandler = (product: ProductCart) => {
        dispatch(addProduct(product))
        openNotification("topRight", product.name)
    }

    return (
        <div className={styles.mainWrapper}>
            {contextHolder}
            <h2 className={styles.title}>{product.name}</h2>
            <Swiper
                modules={[Pagination, Autoplay, Lazy]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                slidesPerView={1}
                spaceBetween={10}
                pagination={{clickable: true}}
            >
                {returnStringInArray(product.images).map((image, index) => (
                    <SwiperSlide key={index}>
                        <img className={"swiper-lazy"} src={image} alt={product.name}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.btnsWrapper}>
                <Button fullWidth children={`${priceReturn(product.price, product.salePrice)}`}/>
                <Button onClick={() => addToCartHandler({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: returnStringInArray(product.images)[0],
                    salePrice: product.salePrice,
                    quantity: 1
                })} children={<ShoppingCartOutlined/>} type={"primary"}/>
            </div>
        </div>
    )
}

export default ProductBlock