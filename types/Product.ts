export interface Product {
    characteristic: string
    created_at: string
    description: string
    images: string
    isAvailable: boolean
    manufacturer: string
    name: string
    price: string
    salePrice: string
    tags: string
    updated_at: string
    _id: string
}

export interface ProductCart {
    _id: string
    name: string
    price: string
    quantity: number
    image: string
    salePrice: string
}