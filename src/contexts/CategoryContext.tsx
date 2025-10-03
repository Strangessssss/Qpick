'use client';

import Category from '@/types/category'; // Make sure you have a Category type
import React, { createContext, useContext, useEffect, useState } from 'react';
import { baseApiUrl } from "@/app/urls";

type CategoryContextType = {
    getCategory: (id: string) => Promise<Category | null>;
    addCategory: (formData: FormData) => Promise<Response>;
    removeCategory: (id: string) => void;
    categories: Category[];

    update: () => void

};

const defaultValues: CategoryContextType = {
    getCategory: async () => null,
    addCategory: async () => new Response(),
    removeCategory: () => {},
    categories: [],

    update: () => {}

};

const CategoryContext = createContext<CategoryContextType>(defaultValues);

export function useCategoryContext() {
    return useContext(CategoryContext);
}

type CategoryContextProviderProps = {
    children: React.ReactNode;
};

export function CategoryContextProvider({ children }: CategoryContextProviderProps) {

    const [categories, setCategories] = useState<Category[]>([]);

    const update = async () => {
        await fetch("http://localhost:5200/api/categories")
            .then((res) => res.json())
            .then((data: Category[]) => {
                setCategories(data);
            })
            .catch((err) => console.error("Fetch error:", err));
    }

    const removeCategory = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5200/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json" // <-- important!
                },
                body: JSON.stringify({ token: localStorage.getItem("token") })
            });
            if (!res.ok) throw new Error("Failed to delete");
            setCategories((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const addCategory = async (formData: FormData) => {
        return await fetch(`${baseApiUrl}/categories`, {
            method: "POST",
            body: formData,
        });
    };

    const getCategory = async (id: string): Promise<Category | null> => {
        try {
            const res = await fetch(`http://localhost:5200/api/categories/${id}`);
            if (!res.ok) throw new Error("Failed to fetch category");

            return await res.json();
        } catch (err) {
            console.error("Fetch error:", err);
            return null;
        }
    };

    return (
        <CategoryContext.Provider value={{ addCategory, removeCategory, categories, getCategory, update}}>
            {children}
        </CategoryContext.Provider>
    );
}