"use client"

import {
    ChevronDown,
    Heart,
    ShoppingCart,
    Smartphone,
} from "lucide-react";
import { DropdownMenu } from "../dropdown-menu";
import {useDropdownMenu} from "@/contexts/DropdownMenuContext";
import Link from "next/link";


export function Header() {
    const { isOpen, toggle, ref } = useDropdownMenu();

    const handleClick = () => {
        toggle();
    }

    return(
      <div className="widht-full h-[60px] flex justify-center md-[22px]">
          <div className="flex w-[77%] justify-between items-center h-full ">
            <div className="flex items-center justify-center gap-[75px]">
                <Link href="/" className="font-[700] text-[25px]
                hover:text-[#FFA542] transition-all duration-300">QPICK</Link>
                <div ref={ref} className="flex flex-row gap-[5px] relative">
                    <button onClick={handleClick} className="flex flex-row items-center gap-[5px] cursor-pointer">
                        <Smartphone className="mr-[10px]" color="#838383"/>
                        <div className="font-[500] text-[15px]">Выбрать модель телефона</div>
                        <ChevronDown width={15} strokeWidth={3}/>
                    </button>
                    <DropdownMenu isOpen={isOpen}/>
                </div>

            </div>
            <div className="flex flex-row gap-[20px]">
                <Link href="/saved">
                    <Heart
                        className="hover:stroke-red-500 transition-all duration-300 cursor-pointer"
                        color="#838383"
                        height="20px"
                    />
                </Link>

                <Link href="/cart">
                    <ShoppingCart
                        className="hover:stroke-black transition-all duration-300 cursor-pointer"
                        color="#838383"
                        height="20px"
                    />
                </Link>
            </div>
          </div>
      </div>
    );
}
