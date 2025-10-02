'use client'

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Product from "@/types/product";
import { imageBaseUrl } from "@/app/urls";
import { useUserContext } from "@/contexts/UserContext";
import toast from "react-hot-toast";

type ProductCardProps = {
    product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const [isSaved, setIsSaved] = useState(false);
    const { user, update } = useUserContext();

    const toggle: React.MouseEventHandler<HTMLDivElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const res = await fetch(`http://localhost:5200/api/users/${user?.id}/saved/${product.id}`, { method: "POST" });
            const saved = await res.json();
            setIsSaved(saved);
            update?.();

            toast.success(saved ? "Добавлено в избранное ❤️" : "Удалено из избранного 🖤");
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Не удалось обновить избранное ❌");
        }
    };

    useEffect(() => {
        if (!user) return;
        setIsSaved(user.savedProducts.some(p => p.id === product.id));
    }, [product.id, user]);

    return (
        <Link
            href={`/products/${product.id}`}
            className="h-[408px] cursor-pointer bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col
            hover:transform hover:scale-103 transition-all duration-300"
        >
            <div onClick={toggle} className="flex flex-row justify-start w-full p-[15px]" aria-label="Save product">
                <Heart
                    className={`transition-all hover:stroke-red-600 cursor-pointer ${isSaved ? "fill-red-500 stroke-red-500" : ""}`}
                    color="#838383"
                    height="20px"
                />
            </div>
            <div className="flex-1 relative w-full px-[20px]">
                <Image
                    src={imageBaseUrl + product.productImages[0]}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="font-[600] text-wrap text-left text-[17px] w-full p-[22px] flex flex-col gap-[25px]">
                <div className="flex flex-row justify-between w-full">
                    <span className="w-[70%]">{product.name}</span>
                    <span className="text-[#FFA542] text-center text-nowrap">{product.price} AZN</span>
                </div>
                <div className="flex flex-row justify-start w-full gap-[10px]">
                    <Star color="#FFCE7F" fill="#FFCE7F" />
                    <span className="text-[#838383]">{product.rating}</span>
                </div>
            </div>
        </Link>
    );
}