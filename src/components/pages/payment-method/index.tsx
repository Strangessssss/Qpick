"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Banknote, CreditCard, Ticket } from "lucide-react";
import {useTranslations} from "use-intl";

export default function PaymentMethod() {
    const { register, watch } = useFormContext();
    const t = useTranslations();

    const method = watch("paymentMethod") || "";

    return (
        <div className="bg-white rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col justify-center items-center w-full p-[20px_20px]">
            <div className="flex flex-row justify-between items-center w-full font-[600] text-[15px]">
                <div>{t("payment-method")}</div>
            </div>

            <div className="flex flex-row justify-between items-center w-full font-[600] text-[15px] gap-[15px]">
                {method === "card" ? <CreditCard /> : <Banknote />}
                <select
                    className="w-full h-[45px] rounded-[15px] text-[15px] font-[500] p-2"
                    {...register("paymentMethod")}
                >
                    <option value="" defaultValue="" disabled>{t("choose-method")}</option>
                    <option value="card">{t("bank-card")}</option>
                    <option value="cash">{t("cash")}</option>
                </select>
            </div>

            <div className="flex flex-row justify-between items-center w-full font-[600] text-[15px] gap-[15px]">
                <Ticket />
                <input
                    className="w-[100%] h-[45px] rounded-[15px] text-[15px] font-[500] p-2"
                    placeholder={t("you-got-promo?")}
                    {...register("promo-code")}
                />
            </div>
        </div>
    );
}