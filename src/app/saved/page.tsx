import {ProductsContainer} from "@/components/pages/earbuds-container";
import {ProductCard} from "@/components/ui/product-card";
import React from "react";

export default function Saved() {
    return (
            <div className="min-h-screen flex flex-col justify-start gap-[22px] mt-[29px]">
                <div className="w-full flex justify-center">
                    <div className="font-[600] text-[20px] text-left w-[77%]">
                        Избранное
                    </div>
                </div>
                <div className="flex justify-start items-center flex-col gap-[30px] flex-flo">
                    <ProductsContainer name={"Наушники"}>
                        <ProductCard name="Airpods Pro 2" img="/airpods-pro-2.png" price={389} rating={4.5}/>
                        <ProductCard name="Airpods 3" img="/airpods-3.png" price={249} rating={4.2}/>
                        <ProductCard name="Airpods 2" img="/airpods-2.png" price={189} rating={3.8}/>
                    </ProductsContainer>
                </div>
            </div>
    );
}