import Image from "next/image";
import {Heart, Star} from "lucide-react";

interface CategoryCardProps {
    name: string;
    img: string;
    price: number;
    rating: number;
}

export function ProductCard({ img, name, price, rating }: CategoryCardProps) {
    return (
        <div className="w-[31%] h-[408px] bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col animate-[toRight_1s_ease-in-out_1]">
            <div className="flex flex-row justify-start w-full p-[15px]">
                <Heart color="#838383" height="20px" />
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