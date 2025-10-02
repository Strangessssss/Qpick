import Category from "@/types/category";
import Brand from "@/types/brand";

export default interface Product {
    id: string;
    name: string;
    description: string;
    productImages: string[];
    price: number;
    rating: number;
    category: Category;
    brand: Brand;
}