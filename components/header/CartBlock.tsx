import React, {useEffect, useState} from "react"
import {ProductCart} from "../../types/Product"
import cn from "classnames"
import styles from "./CartBlock.module.css"
import CartProductBlock from "../product/CartProductBlock"
import {getFullPrice} from "../../utils/getFullPrice"
import {Button, Form, Input} from "antd"
import InputMask from "react-input-mask";
import {useDispatch} from "../../store"
import createOrder from "../../features/order/createOrder"
import {deleteAllProducts, useGetProducts} from "../../features/products/productSlice"
import AddAddress from "../../features/order/AddAddress"

interface CartBlockProps {
    products: ProductCart[]
    active: boolean
    setActive: (val: boolean) => void
}

const CartBlock: React.FC<CartBlockProps> = ({products, active, setActive}) => {
    const {selectedAddress} = useGetProducts()
    const [number, setNumber] = useState("")
    const [name, setName] = useState("")
    const [modal, setModal] = useState(false)
    const [center, setCenter] = useState({lat: 41.31325508006936, lng: 69.27833125291268})
    const [region, setRegion] = useState({center: [center.lat, center.lng], zoom: 13, controls: []})
    const dispatch = useDispatch()

    const onFinish = () => {
        dispatch(createOrder({
            delivery_type: "delivery",
            delivery_address: selectedAddress,
            payment_type: "cash",
            user: {
                name: name,
                number: number
            },
            order_items: products
        }))
        dispatch(deleteAllProducts())
        window.location.reload()
    };

    return (
        <div className={cn(styles.mainWrapper, {[styles.active]: active})}>
            <div onClick={() => setActive(false)} className={cn(styles.bg, {[styles.active]: active})}></div>
            <div className={cn(styles.cartBlock, {[styles.active]: active})}>
                {products.length > 0 ? <>
                    {products.map((product, index) => (
                        <CartProductBlock product={product} key={index} />
                    ))}
                    <h2 className={styles.title}>Оформление заказа</h2>
                    <Form
                        className={styles.form}
                    >
                        <Form.Item label={"Имя"}>
                            <Input placeholder="Введите ваше имя" onChange={(e) => setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={"Номер"}>
                            <InputMask onChange={(event) => setNumber(event.target.value)} mask="+375 (99) 999-99-99" />
                        </Form.Item>
                        <Form.Item label={"Адрес"}>
                            <Button onClick={() => setModal(true)}>Выбрать на карте</Button>
                        </Form.Item>
                        <div className={styles.fullPrice}>
                            <p>
                                Сэкономлено: {getFullPrice(products)[1]} BYN
                            </p>
                            <p>Итого: {getFullPrice(products)[0]} BYN</p>
                        </div>
                        <Button disabled={name === "" || number === ""} onClick={() => onFinish()} htmlType={"submit"} className={styles.goReview}>Оформить заказ</Button>
                    </Form>
                </> : (
                    <div className={styles.empty}>
                        <h2>Корзина пуста</h2>
                    </div>
                )}
            </div>
            {modal && <AddAddress setCenter={setCenter} setRegion={setRegion} center={center} region={region} setModal={setModal} />}
        </div>
    )
}

export default CartBlock