import React from "react"
import {useGetProductQuery} from "../features/products/productApi"
import {Layout} from "antd"
import Header from "../components/header/Header"
import ProductWrapper from "../components/product/ProductWrapper"

const Index = () => {
    // @ts-ignore
    const {data, isLoading, isSuccess} = useGetProductQuery()
    const {Footer} = Layout

    if (isLoading) {
        return <div>Loading...</div>
    } else if (isSuccess) {
        return (
            <Layout className={"layout"}>
                <Header />
                <ProductWrapper products={data}/>
                <Footer style={{textAlign: "center"}}>Ахмаджонов Икромжон</Footer>
            </Layout>
        )
    } else {
        return <div>Error</div>
    }
}

export default Index