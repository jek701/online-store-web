import {ProductCart} from "../types/Product"

export const getFullPrice = (products: ProductCart[]) => {
    // @ts-ignore
    const howMuchSaved = products.reduce((acc, product) => acc + product.price * product.quantity, 0) - products.reduce((acc, product) => acc + product.salePrice * product.quantity, 0)
    // @ts-ignore
    return [products.reduce((acc, product) => acc + (product.salePrice ? product.salePrice : product.price) * product.quantity, 0), howMuchSaved]
}