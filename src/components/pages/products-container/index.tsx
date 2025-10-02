import React from "react";
import { Frown } from "lucide-react";

interface ProductsContainerProps {
    name: string;
    children?: React.ReactNode;
}

export function ProductsContainer({ name, children }: ProductsContainerProps) {
    return (
        <div className="w-[77%] flex flex-col justify-center gap-[20px]">
            <div className="font-[600] text-[#838383] text-[20px]">{name}</div>
            <div className="flex flex-col justify-center items-center">
                <div
                    className="
                        grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
                        w-full
                    "
                >
                    {children !== undefined ? (
                        children
                    ) : (
                        <div className="flex flex-row items-center gap-[10px] col-span-full justify-center">
                            <div className="font-[600] text-[#838383] text-[20px]">
                                Тут пусто
                            </div>
                            <Frown color="#838383" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}