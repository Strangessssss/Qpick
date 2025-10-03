"use client";

import React, { use, useEffect, useState } from "react";
import Product from "@/types/product";
import { Heart } from "lucide-react";
import Image from "next/image";
import { imageBaseUrl } from "@/app/urls";
import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {useTranslations} from "use-intl";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const t = useTranslations();

    const { getProduct } = useProductContext();
    const [product, setProduct] = useState<Product | null>();
    const [saved, setSaved] = useState(false);
    const [inCart, setInCart] = useState(false);

    const { user, update } = useUserContext();

    useEffect(() => {
        getProduct(id)
            .then((p) => setProduct(p))
            .catch(() => toast.error("Ошибка при загрузке продукта"));

        if (!user) return;

        setInCart(user.cartProducts.some(p => p.productId === id));
        setSaved(user.savedProducts.some(p => p.id === id));
    }, [getProduct, id, user]);

    const toggleSaved: React.MouseEventHandler<HTMLDivElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const res = await fetch(`http://localhost:5200/api/users/${user?.id}/saved/${id}`, { method: "POST" });
            const savedStatus = await res.json();
            setSaved(savedStatus);
            update?.();

            toast.success(savedStatus ? "Добавлено в избранное ❤️" : "Удалено из избранного 🖤");
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Не удалось обновить избранное ❌");
        }
    };

    const toggleCart: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const res = await fetch(`http://localhost:5200/api/users/${user?.id}/cart/${id}?quantity=1`, { method: "PUT" });
            const cart = await res.json();
            setInCart(true);
            update?.();

            toast.success("Добавлено в корзину 🛒");
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Не удалось добавить в корзину ❌");
        }
    };

    const handleBuy: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        if (!inCart) {
            await toggleCart(e);
        }

        router.push("/cart");
    };

    return (
        <div className="flex flex-col items-center gap-[22px] mt-[29px] w-full">
            <div className="font-[600] text-[20px] text-left w-[77%] text-[#838383]">{product?.name}</div>

            <div className="w-[77%] h-[668px] bg-white rounded-[30px] flex flex-col justify-center relative gap-[20px] p-[20px]">
                <div onClick={toggleSaved} className="left-[24px] top-[20px] absolute">
                    <Heart
                        className={`transition-all hover:stroke-red-600 cursor-pointer ${saved && "fill-red-500 stroke-red-500"}`}
                        color="#838383"
                        height="20px"
                    />
                </div>

                <div className="w-full h-full flex flex-row justify-center items-center">
                    {product?.productImages.map((image, index) => (
                        <div className="w-[200px] aspect-[3/4] relative" key={index}>
                            <Image src={imageBaseUrl + image} alt="Image" className="object-contain" fill />
                        </div>
                    ))}
                </div>

                <div className="w-full flex flex-row justify-between items-center p-[20px] gap-[10px]">
                    <div className="font-[600] text-[25px] text-left">{product?.name}</div>
                    <div className="font-[400] text-[25px] text-left">{product?.price} AZN</div>
                </div>
            </div>

            <div className="w-[77%] flex flex-row justify-between gap-[20px]">
                <div className="flex-1/4 bg-[#F9F9F9] rounded-[15px]">
                    <div className="shadow-2xl bg-white w-full rounded-[15px] p-[20px] flex flex-col justify-start items-start gap-[20px] ">
                        {t("description")}
                    </div>
                    <div className="min-h-[100px] w-full rounded-[15px] p-[20px] flex flex-col justify-start items-start gap-[20px] whitespace-pre-line">
                        {product?.description.replace(/;/g, "\n")}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-start items-start gap-[20px]">
                    <button onClick={handleBuy} className="bg-[#101010] cursor-pointer text-white font-[500] text-[20px] rounded-[15px] h-[45px] w-full">
                        {t("purchase")}
                    </button>
                    <button onClick={!inCart ? toggleCart : () => router.push("/cart")} className="bg-[#101010] cursor-pointer text-white font-[500] text-[20px] rounded-[15px] h-[45px] w-full">
                        {!inCart ? t("add-to-cart") : t("already-in-cart")}
                    </button>
                </div>
            </div>
        </div>
    );
}