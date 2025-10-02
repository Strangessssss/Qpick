import {useForm} from "react-hook-form";
import React, {useRef, useState} from "react";
import {Plus, Trash} from "lucide-react";
import {useProductContext} from "@/contexts/ProductContext";
import {useBrandContext} from "@/contexts/BrandContext";
import {useCategoryContext} from "@/contexts/CategoryContext";

type FormData = {
    name: string;
    price: string;
    description: string;
    category: string;
    brand: string;
};

export function AddProductMenu(){
    const { register, reset, handleSubmit } = useForm<FormData>();
    const { addProduct } = useProductContext();
    const { brands } = useBrandContext();
    const { categories } = useCategoryContext();

    const [previewUrls, setPreviewUrls] = useState<{ [key: number]: string | null }>({});
    const [files, setFiles] = useState<{ [key: number]: File | null }>({});

    const fileInputs = useRef<{ [key: number]: HTMLInputElement | null }>({});

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("brand", data.brand);

        Object.values(files).forEach(file => {
            if (file) {
                formData.append("images", file);
            }
        });

        try {
            const res = await addProduct(formData);
            if (!res.ok) throw new Error("Failed to upload");
            reset();
            setPreviewUrls({});
            setFiles({});
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, key: number) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) handleFileSelect(droppedFiles[0], key);
    };

    const handleFileSelect = (file: File, key: number) => {
        const url = URL.createObjectURL(file);
        setPreviewUrls(prev => ({ ...prev, [key]: url }));
        setFiles(prev => ({ ...prev, [key]: file }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0], key);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleImageRemove = (key: number) => {
        setPreviewUrls(prev => ({ ...prev, [key]: null }));
        setFiles(prev => ({ ...prev, [key]: null }));
        if (fileInputs.current[key]) fileInputs.current[key]!.value = "";
    };

    return (
        <div className="w-full border-2 m-2 flex flex-col justify-evenly items-center gap-[20px] p-[20px] border-gray-400 rounded-2xl">
            <div className="w-full flex flex-col justify-start items-start gap-[15px]">
                Add new product
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-evenly gap-[20px] relative">
                <div className="aspect-square w-[25%] flex items-center justify-center rounded-2xl flex-wrap">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, i)}
                            onClick={() => fileInputs.current[i]?.click()}
                            className="aspect-square p-2 w-[50%] flex items-center justify-center border-2 border-dotted border-gray-400 rounded-2xl cursor-pointer"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                ref={(el) => {
                                    fileInputs.current[i] = el;
                                }}
                                className="hidden"
                                onChange={(e) => handleInputChange(e, i)}
                            />
                            {previewUrls[i] ? (
                                <div className="w-full h-full relative">
                                    <img
                                        src={previewUrls[i]!}
                                        alt="preview"
                                        className="w-full h-full object-cover p-2 border-2 border-gray-400 rounded-2xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleImageRemove(i); }}
                                        className="w-full h-full cursor-pointer opacity-0 transition-all hover:opacity-100 text-white bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 flex justify-center items-center rounded-2xl"
                                    >
                                        <Trash className="stroke-white" width={20} height={20}/>
                                    </button>
                                </div>
                            ) : (
                                <span className="text-gray-500 w-full h-full flex justify-center items-center text-center">
                                    Drop or click to browse
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex-1 flex flex-col justify-start gap-[15px]">
                    <div className="flex flex-row gap-[10px] w-full items-center">
                        <input {...register("name")} className="border-2 border-gray-400 rounded-2xl w-full p-2 placeholder:text-gray-400" placeholder="Name"/>
                        <input {...register("price")} className="border-2 border-gray-400 rounded-2xl p-2 placeholder:text-gray-400" placeholder="Price"/>
                        AZN
                    </div>
                    <textarea {...register("description")} className="border-2 border-gray-400 rounded-2xl flex-1 p-2 placeholder:text-gray-400" placeholder="Description"/>
                    <div className="flex flex-row gap-[10px] w-full">
                        <select {...register("category")} defaultValue="" className="border-2 border-gray-400 rounded-2xl flex-1 p-2">
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <select {...register("brand")} defaultValue="" className="border-2 border-gray-400 rounded-2xl flex-1 p-2">
                            <option value="" disabled>Select a brand</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-green-700 rounded-[15px] text-white flex justify-center items-center w-full h-[40px] hover:bg-green-500 transition-all duration-200 cursor-pointer">
                        <Plus width={20} height={20}/>
                    </button>
                </div>
            </form>
        </div>
    )
}