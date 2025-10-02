"use client"

import {Trash} from "lucide-react";
import React, {useEffect, useState} from "react";
import Product from "@/types/product";
import {useProductContext} from "@/contexts/ProductContext";
import {useCategoryContext} from "@/contexts/CategoryContext";

export function DashboardCategoriesList() {

    const {categories, removeCategory, update} = useCategoryContext()

    useEffect(() => {
        update();
    }, [])

    return (
        <div className="w-full min-h-[300px] border-2 m-2 flex flex-col justify-start items-start gap-[20px] p-[20px] border-gray-400 rounded-2xl">
            <div className="w-full flex flex-col justify-start items-start gap-[15px]">
                Categories
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-[15px]">
                <div className="w-full flex justify-start items-center gap-[15px] flex-wrap">
                    {
                        categories &&
                        categories.map((category, index) => (
                            <div key={index} className={`w-[32%] flex flex-col justify-center items-center gap-[10px] border-2 cursor-pointer hover:scale-105 transition-all ${(index + 2) % 3 === 0 ? "border-blue-700": "border-gray-400"} rounded-2xl p-[15px]`}>
                                <div className="flex flex-row gap-[10px]">
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="border-2 border-gray-400 rounded-2xl p-2 font-[600]">
                                            Id:
                                        </div>
                                        <div className="border-2 border-gray-400 rounded-2xl p-2">
                                            {category.id}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="border-2 border-gray-400 rounded-2xl p-2 font-[600]">
                                            Name
                                        </div>
                                        <div className="border-2 border-gray-400 rounded-2xl p-2">
                                            {category.name}
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => removeCategory(category.id)} className="w-full bg-red-800 rounded-2xl p-2 font-[600] flex justify-center items-center cursor-pointer hover:bg-red-700 transition-all">
                                    <Trash className="stroke-white" height={20}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}