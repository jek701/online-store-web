import React from "react"
import {useGetProductByIdQuery} from "features/products/productApi"
import {useRouter} from "next/router"
import {Button, Card, Image, Layout, notification, Space, Tag} from "antd"
import Header from "components/header/Header"
import styles from "./style.module.css"
import {Lazy, Pagination, Navigation} from "swiper"
import {returnStringInArray} from "utils/returnStringInArray"
import {SwiperSlide, Swiper} from "swiper/react"
import "swiper/swiper.min.css"
import "swiper/css/pagination"
import "swiper/css/navigation";
import {ShoppingCartOutlined} from "@ant-design/icons"
import {useDispatch} from "../../store"
import {NotificationPlacement} from "antd/es/notification/interface"
import {ProductCart} from "../../types/Product"
import {addProduct} from "../../features/products/productSlice"

const Index = () => {
    const router = useRouter()
    const {Footer} = Layout
    const {data, isLoading, isSuccess} = useGetProductByIdQuery(`${router.query.id}`)
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
        router.push("/")
    }
    if (isLoading) {
        return <div>Loading...</div>
    } else if (isSuccess && data) {
        return (
            <Layout className={"layout"}>
                {contextHolder}
                <Header />
                <div className={styles.mainWrapper}>
                    <div className={styles.sliderWrapper}>
                        <Swiper
                            autoHeight={true}
                            modules={[Pagination, Lazy, Navigation]}
                            navigation={true}
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{clickable: true}}
                        >
                            {returnStringInArray(data.images).map((image, index) => (
                                <SwiperSlide key={index}>
                                    <Image src={image} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Card size="small">
                            <h2>
                                {data.name}
                            </h2>
                        </Card>
                        <Card size="small">
                            <p>
                                Производитель: <Tag style={{padding: "5px 15px", marginLeft: "15px"}} color={"green"}>{data.manufacturer}</Tag>
                            </p>
                        </Card>
                        <Card size="default" title={"Описание"}>
                            <p>
                                {data.description}
                            </p>
                        </Card>
                        <Space size={"large"} align={"center"} direction={"horizontal"}>
                            <h3>
                                Цена: {data.price} BYN.
                            </h3>
                            <Button onClick={() => addToCartHandler({
                                _id: data._id,
                                name: data.name,
                                price: data.price,
                                quantity: 1,
                                image: returnStringInArray(data.images)[0],
                                salePrice: data.salePrice
                            })} block={true} type={"primary"} size={"large"}>
                                Добавить в корзину <ShoppingCartOutlined />
                            </Button>
                        </Space>
                    </Space>
                </div>
                <Footer style={{textAlign: "center"}}>Ахмаджонов Икромжон</Footer>
            </Layout>
        )
    } else {
        return <div>Error</div>
    }
}

export default Index

