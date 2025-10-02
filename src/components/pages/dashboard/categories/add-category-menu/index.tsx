"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { Plus } from "lucide-react";
import { baseApiUrl } from "@/app/urls";
import {useProductContext} from "@/contexts/ProductContext";
import {useCategoryContext} from "@/contexts/CategoryContext";

type FormData = {
    name: string;
};

export function AddCategoryMenu() {
    const { register, reset, handleSubmit } = useForm<FormData>();

    const {addCategory} = useCategoryContext()


    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        formData.append("name", data.name);

        try {
            const res = await addCategory(formData);

            if (!res.ok) throw new Error("Failed to upload");
            reset();
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full border-2 m-2 flex flex-col justify-evenly items-center gap-[20px] p-[20px] border-gray-400 rounded-2xl">
            <div className="w-full flex flex-col justify-start items-start gap-[15px]">
                Add new category
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex justify-evenly gap-[20px] relative"
            >
                <div className="flex-1 flex flex-col justify-start gap-[15px]">
                    <input
                        {...register("name")}
                        className="border-2 border-gray-400 rounded-2xl w-full p-2 placeholder:text-gray-400"
                        placeholder="Name"
                    />
                    <button
                        className="bg-green-700 rounded-[15px] text-white flex justify-center items-center w-full h-[40px]
                hover:bg-green-500 transition-all duration-200 cursor-pointer"
                    >
                        <Plus width={20} height={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}