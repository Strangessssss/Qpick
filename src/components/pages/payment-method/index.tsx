"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Banknote, CreditCard, Ticket } from "lucide-react";

export default function PaymentMethod() {
    const { register, watch } = useFormContext();

    const method = watch("paymentMethod") || "";

    return (
        <div className="bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col justify-center items-center w-full p-[20px_20px]">
            <div className="flex flex-row justify-between items-center w-full font-[600] text-[15px]">
                <div>Способ оплаты</div>
            </div>

            <div className="flex flex-row justify-between items-center w-full font-[600] text-[15px] gap-[15px]">
                {method === "card" ? <CreditCard /> : <Banknote />}
                <select
                    className="w-full h-[45px] rounded-[15px] text-[15px] font-[500] p-2"
                    {...register("paymentMethod")}
                >
                    <option value="" defaultValue="" disabled>Выберите способ</option>
                    <option value="card">Bank Card</option>
                    <option value="cash">Cash</option>
                </select>
            </div>

            <div className="flex flex-row justify-between items-center w-full font-[600] text-[15px] gap-[15px]">
                <Ticket />
                <input
                    className="w-[100%] h-[45px] rounded-[15px] text-[15px] font-[500] p-2"
                    placeholder="Есть промокод?"
                    {...register("promoCode")}
                />
            </div>
        </div>
    );
}