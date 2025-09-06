"use client"

import {
    ChevronDown,
    Heart,
    ShoppingCart,
    Smartphone,
} from "lucide-react";
import { DropdownMenu } from "../dropdown-menu";
import {useDropdownMenu} from "@/contexts/DropdownMenuContext";


export function Header() {
    const { isOpen, toggle, ref } = useDropdownMenu();

    const handleClick = () => {
        toggle();
    }

    return(
      <div className="widht-full h-[60px] flex justify-center md-[22px]">
          <div className="flex w-[77%] justify-between items-center h-full ">
            <div className="flex items-center justify-center gap-[75px]">
                <div className="font-[700] text-[25px]">QPICK</div>
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
                <Heart color="#838383" height="20px"/>
                <ShoppingCart color="#838383" height="20px"/>
            </div>
          </div>
      </div>
    );
}
