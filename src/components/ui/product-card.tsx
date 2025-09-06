"use client"

import Image from "next/image";
import {Heart, Star} from "lucide-react";
import {useState} from "react";

interface CategoryCardProps {
    name: string;
    img: string;
    price: number;
    rating: number;
}

export function ProductCard({ img, name, price, rating }: CategoryCardProps) {

    const [isSaved, setIsSaved] = useState(false);

    const toggle = () => setIsSaved(prev => !prev);

    return (
        <div className="w-[31%] h-[408px] bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col animate-[toRight_1s_ease-in-out_1]
        hover:transform hover:scale-103 transition-all duration-300
        ">
            <div onClick={toggle} className="flex flex-row justify-start w-full p-[15px]">
                <Heart className={`transition-all hover:stroke-red-600 ${isSaved && "fill-red-500 stroke-red-500"}`} color="#838383" height="20px"/>
            </div>
            <div className="flex-1 relative w-full px-[20px]">
                <Image
                    src={img}
                    alt="Image"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="font-[600] text-[17px] text-center w-full p-[22px] flex flex-col gap-[25px]">
                <div className="flex flex-row justify-between w-full">
                    <span>{name}</span>
                    <span className="text-[#FFA542]">{price} AZN</span>
                </div>
                <div className="flex flex-row justify-start w-full gap-[10px]">
                    <Star color="#FFCE7F" fill="#FFCE7F" />
                    <span className="text-[#838383]">{rating}</span>
                </div>
            </div>
        </div>
    );
}