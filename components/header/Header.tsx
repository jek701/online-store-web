import React from "react"
import {Badge, Button, Divider, Space, Typography} from "antd"
import {ShoppingCartOutlined} from "@ant-design/icons"
import styles from "./Header.module.css"
import CartBlock from "./CartBlock"
import {useGetProducts} from "../../features/products/productSlice"

const Header = () => {
    const {products} = useGetProducts()
    // @ts-ignore
    const [active, setActive] = React.useState(false)
    return (
        <div className={styles.wrapper}>
            <div className={styles.innerBlock}>
                <h1>
                    <a href="/">LOGO</a>
                </h1>
                <Space split={<Divider type="vertical" />}>
                    <Typography.Link>Главное меню</Typography.Link>
                    <Typography.Link>Акции</Typography.Link>
                    <Typography.Link>Контакты</Typography.Link>
                </Space>
                <CartBlock products={products} active={active} setActive={setActive}/>
                <Space>
                    <Badge count={products.length}>
                        <Button onClick={() => setActive(true)}><ShoppingCartOutlined/></Button>
                    </Badge>
                </Space>
            </div>
        </div>
    )
}

export default Header