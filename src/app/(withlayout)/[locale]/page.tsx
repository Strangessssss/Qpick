"use client"

import { Hero } from "@/components/pages/hero";
import { ProductsContainer } from "@/components/pages/products-container";
import { ProductCard } from "@/components/ui/product-card";
import React, { useEffect, useState, useMemo } from "react";
import Product from "@/types/product";
import { baseApiUrl } from "@/app/urls";
import { useUserContext } from "@/contexts/UserContext";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") ?? undefined;
    const brandParam = searchParams.get("brand") ?? undefined;

    const [products, setProducts] = useState<Product[]>([]);
    const { user, update } = useUserContext();

    useEffect(() => {
        update();

        const query = new URLSearchParams();
        if (categoryParam) query.append("category", categoryParam);
        if (brandParam) query.append("brand", brandParam);

        fetch(`${baseApiUrl}/products?${query.toString()}`)
            .then(res => res.json())
            .then((data: Product[]) => setProducts(data))
            .catch(err => console.error("Fetch error:", err));
    }, [categoryParam, brandParam]);

    const groupedProducts = useMemo(() => {
        return products.reduce((acc: Record<string, Product[]>, product) => {
            const categoryName = product.category?.name || "Без категории";
            if (!acc[categoryName]) acc[categoryName] = [];
            acc[categoryName].push(product);
            return acc;
        }, {});
    }, [products]);

    return (
        <div className="flex items-center flex-col gap-[30px] w-full">
            <Hero />
            {Object.entries(groupedProducts).map(([categoryName, productsInCategory]) => (
                <ProductsContainer key={categoryName} name={categoryName}>
                    {productsInCategory.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ProductsContainer>
            ))}
        </div>
    );
}