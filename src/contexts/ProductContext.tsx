'use client';

import Product from '@/types/product';
import React, {createContext, useContext, useState} from 'react';
import {baseApiUrl} from "@/app/urls";

type ProductContextType = {
    getProduct: (id: string) => Promise<Product | null>
    addProduct: (formData: FormData) => Promise<Response>;
    removeProduct: (id: string) => void
    products: Product[];

    update: () => void
};

const defaultValues: ProductContextType = {
    getProduct: async () => null,
    addProduct: async () => new Response(),
    removeProduct: () => {},
    products: [],

    update: () => {}
};

const ProductContext = createContext<ProductContextType>(defaultValues);

export function useProductContext() {
    return useContext(ProductContext);
}

type ProductContextProviderProps = {
    children: React.ReactNode;
};

export function ProductContextProvider({ children }: ProductContextProviderProps) {

    const [products, setProducts] = useState<Product[]>([]);

    const update = async () => {
        await fetch("http://localhost:5200/api/products")
            .then((res) => res.json())
            .then((data: Product[]) => {
                setProducts(data);
            })
            .catch((err) => console.error("Fetch error:", err));
    }

    const removeProduct = async (id:string) => {
        try {
            const res = await fetch(`http://localhost:5200/api/products/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    }

    const addProduct = async (formData: FormData) => {
        return await fetch(`${baseApiUrl}/products`, {
            method: "POST",
            body: formData,
        });
    }

    const getProduct = async (id: string): Promise<Product | null> => {
        try {
            const res = await fetch("http://localhost:5200/api/products/" + id);
            if (!res.ok) throw new Error("Failed to fetch product");

            return await res.json();

        } catch (err) {
            console.error("Fetch error:", err);
            return null;
        }
    };
    return (
        <ProductContext.Provider value={{ addProduct, removeProduct, products, getProduct, update }}>
            {children}
        </ProductContext.Provider>
    );
}