"use client"

import {ProductsContainer} from "@/components/pages/products-container";
import React, {useEffect, useMemo} from "react";
import {useUserContext} from "@/contexts/UserContext";
import {ProductCard} from "@/components/ui/product-card";
import Product from "@/types/product";
import Image from "next/image";
import {redirect} from "next/navigation";
import {useTranslations} from "use-intl";

export default function Saved() {
    const { user, update } = useUserContext();

    const t = useTranslations();

    useEffect(() => {
        update();
    }, []);

    const groupedProducts = useMemo(() => {
        if (!user?.savedProducts) return {};
        return user.savedProducts.reduce((acc: Record<string, Product[]>, product) => {
            const categoryName = product.category.name ?? t("no-category");
            if (!acc[categoryName]) acc[categoryName] = [];
            acc[categoryName].push(product);
            return acc;
        }, {});
    }, [user?.savedProducts]);

    if (!user?.savedProducts || user.savedProducts.length === 0) {
        return (
            <div className="flex justify-center items-center flex-col w-full h-full flex-1">
                <div className="w-[40%] aspect-square relative">
                    <Image src="/empty-cart.png" alt="empty-saved" fill className="object-contain" />
                </div>
                <div className="font-[500] text-[30px] text-center w-[40%] mt-[20px]">
                    {t("cart-empty")}
                </div>
                <div className="font-[400] text-[20px] text-center text-[#838383]">
                    {t("cart-empty-2")}
                </div>
                <button onClick={() => redirect("/")} className="w-[540px] h-[65px] bg-black mt-[30px] rounded-[20px] text-white font-[600] text-[20px] flex justify-center items-center cursor-pointer hover:text-black hover:bg-[#FFA542] transition-all duration-300">
                    {t("to-catalogue")}
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full justify-start gap-[22px] mt-[29px]">
            <div className="w-full flex justify-center">
                <div className="font-[600] text-[20px] text-left w-[77%]">
                    Избранное
                </div>
            </div>

            <div className="flex justify-start items-center flex-col gap-[30px] flex-flo">
                {Object.entries(groupedProducts).map(([categoryName, products]) => (
                    <ProductsContainer key={categoryName} name={categoryName}>
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </ProductsContainer>
                ))}
            </div>
        </div>
    );
}