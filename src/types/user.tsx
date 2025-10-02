import Product from "@/types/product";
import CartProduct from "@/types/cartProduct";

export default interface User {
    id: string;
    cartProducts: CartProduct[];
    savedProducts: Product[];
    cartPrice: number;
}