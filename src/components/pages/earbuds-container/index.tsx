import React from "react";
import {Frown} from "lucide-react";

interface ProductsContainerProps {
    name: string;
    children?: React.ReactNode;
}

export function ProductsContainer({name, children}: ProductsContainerProps) {
    return (
        <div className="w-[77%] flex flex-col justify-center gap-[20px]">
            <div className="font-[600] text-[#838383] tex-[20px]">{name}</div>
            <div className="flex flex-row justify-evenly flex-wrap gap-[30px]">
                {children !== undefined ?
                    children :
                    <div className="flex flex-row items-center gap-[10px]">
                        <div className="font-[600] text-[#838383] tex-[20px]">
                            Тут пусто
                        </div>
                        <Frown color="#838383"/>
                    </div>
                }
            </div>
        </div>
    )
}
