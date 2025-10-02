import Product from "@/types/product";

export default interface CartProduct {
    id: string;
    userId: string;
    productId: string;
    product: Product;
    quantity: number;
}