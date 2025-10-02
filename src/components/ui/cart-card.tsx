"use client";

import Image from "next/image";
import { Trash } from "lucide-react";
import { imageBaseUrl } from "@/app/urls";
import CartProduct from "@/types/cartProduct";
import { useState } from "react";
import toast from "react-hot-toast";

interface CartCardProps {
    product: CartProduct;
}

export function CartCard({ product }: CartCardProps) {
    const [cartProduct, setCartProduct] = useState<CartProduct>(product);

    if (!cartProduct || cartProduct.quantity === 0) return null;

    const updateCart = async (quantity: number, action: string) => {
        try {
            const res = await fetch(
                `http://localhost:5200/api/users/${cartProduct.userId}/cart/${cartProduct.productId}?quantity=${quantity}`,
                { method: "PUT" }
            );

            if (!res.ok) throw new Error("Failed to update cart");

            const data: CartProduct = await res.json();
            setCartProduct(data);

            if (quantity === 0) toast.success("Товар удалён из корзины 🗑️");
            else if (action === "increase") toast.success("Количество увеличено ➕");
            else if (action === "decrease") toast.success("Количество уменьшено ➖");

        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Не удалось обновить корзину ❌");
        }
    };

    const handleIncrease = () => updateCart(cartProduct.quantity + 1, "increase");
    const handleDecrease = () => {
        if (cartProduct.quantity <= 1) {
            updateCart(0, "delete");
        } else {
            updateCart(cartProduct.quantity - 1, "decrease");
        }
    };
    const handleDelete = () => updateCart(0, "delete");

    return (
        <div className="w-full h-[200px] bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-row justify-between relative">
            <div className="h-[100%] flex flex-row items-center p-[10px] gap-[40px]">
                <div className="h-[100%] relative flex flex-col justify-between items-center">
                    <div className="h-[75%] aspect-square relative">
                        <Image
                            src={imageBaseUrl + cartProduct.product.productImages[0]}
                            fill
                            alt="Image"
                            className="object-contain"
                        />
                    </div>
                    <div className="w-[80%] flex-1 flex flex-row align-center justify-between items-center gap-[10px]">
                        <button
                            type="button"
                            onClick={handleDecrease}
                            className="h-[70%] aspect-square bg-[#FFCE7F] rounded-[30px] transition-all duration-300 hover:bg-orange-400 active:bg-black cursor-pointer text-white font-[600] text-[17px]"
                        >
                            -
                        </button>
                        <div className="font-[600] text-[17px] text-center w-[100px] h-[100%] flex justify-center items-center">
                            {cartProduct.quantity}
                        </div>
                        <button
                            type="button"
                            onClick={handleIncrease}
                            className="h-[70%] aspect-square bg-[#FFCE7F] rounded-[30px] text-white font-[600] text-[17px]"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="w-[100px] h-[100%] flex justify-center items-start flex-col gap-[12px]">
                    <div className="font-[500] text-[17px] text-nowrap text-left">
                        {cartProduct.product.name}
                    </div>
                    <div className="text-left font-[600] text-[15px] text-[#AAAAAA]">
                        {cartProduct.product.price} AZN
                    </div>
                </div>
            </div>
            <div className="h-[100%] flex flex-col justify-between items-end p-[15px] gap-[10px]">
                <Trash
                    onClick={handleDelete}
                    className="duration-300 transition-all hover:stroke-red-700 stroke-[#DF6464] cursor-pointer"
                    height="20px"
                />
                <div className="font-[600] text-[15px] text-center">
                    {(cartProduct.quantity * cartProduct.product.price).toFixed(2)} AZN
                </div>
            </div>
        </div>
    );
}