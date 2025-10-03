'use client';

import Brand from '@/types/brand'; // Make sure you have a Brand type
import React, { createContext, useContext, useEffect, useState } from 'react';
import { baseApiUrl } from "@/app/urls";

type BrandContextType = {
    getBrand: (id: string) => Promise<Brand | null>;
    addBrand: (formData: FormData) => Promise<Response>;
    removeBrand: (id: string) => void;
    brands: Brand[];

    update: () => void;
};

const defaultValues: BrandContextType = {
    getBrand: async () => null,
    addBrand: async () => new Response(),
    removeBrand: () => {},
    brands: [],

    update: () => {}
};

const BrandContext = createContext<BrandContextType>(defaultValues);

export function useBrandContext() {
    return useContext(BrandContext);
}

type BrandContextProviderProps = {
    children: React.ReactNode;
};

export function BrandContextProvider({ children }: BrandContextProviderProps) {

    const [brands, setBrands] = useState<Brand[]>([]);

    const update = async () => {
        await fetch("http://localhost:5200/api/brands")
            .then((res) => res.json())
            .then((data: Brand[]) => {
                setBrands(data);
            })
            .catch((err) => console.error("Fetch error:", err));
    }

    const removeBrand = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5200/api/brands/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json" // <-- important!
                },
                body: JSON.stringify({ token: localStorage.getItem("token") })
            });
            if (!res.ok) throw new Error("Failed to delete");
            setBrands((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const addBrand = async (formData: FormData) => {
        return await fetch(`${baseApiUrl}/brands`, {
            method: "POST",
            body: formData,
        });
    };

    const getBrand = async (id: string): Promise<Brand | null> => {
        try {
            const res = await fetch(`http://localhost:5200/api/brands/${id}`);
            if (!res.ok) throw new Error("Failed to fetch brand");

            return await res.json();
        } catch (err) {
            console.error("Fetch error:", err);
            return null;
        }
    };

    return (
        <BrandContext.Provider value={{ addBrand, removeBrand, brands, getBrand, update }}>
            {children}
        </BrandContext.Provider>
    );
}