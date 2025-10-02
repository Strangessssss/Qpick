"use client"

import React, {use} from "react";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="flex flex-col items-center gap-[22px] mt-[29px] w-full">
            <div className="w-[77%] h-[95px] bg-white rounded-[30px] font-bold flex flex-col items-center justify-center relative gap-[20px] p-[20px]">
                Номер вашего заказа №{id}, с Вами свяжется наш менеджер.
            </div>
        </div>
    );
}