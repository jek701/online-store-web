export const priceReturn = (price: string, salePrice: string) => {
    return (
        // Format price BYN
        (Number(salePrice ? salePrice : price)).toLocaleString("ru-RU", {
            style: "currency",
            currency: "BYN"
        }) // Format sale price BYN
    )
}