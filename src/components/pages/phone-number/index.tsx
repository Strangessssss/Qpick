"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {useTranslations} from "use-intl";

export default function PhoneNumber() {
    const { control } = useFormContext();
    const t = useTranslations();

    const formatAzerbaijaniNumber = (value: string) => {
        const digits = value.replace(/\D/g, "");
        const trimmed = digits.slice(0, 10);

        if (trimmed.length <= 3) return `(${trimmed}`;
        if (trimmed.length <= 6) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
        if (trimmed.length <= 8)
            return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)} ${trimmed.slice(6)}`;
        return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)} ${trimmed.slice(6, 8)}-${trimmed.slice(8, 10)}`;
    };

    return (
        <div className="bg-white h-[130px] rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col justify-center gap-5 items-center w-full">
            <div className="flex flex-row justify-between items-center p-[0_23px] w-full font-[600] text-[15px]">
                <div>{t("recipient-phone")}</div>
            </div>

            <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input
                        {...field}
                        className="w-[90%] h-[45px] rounded-[15px] flex flex-col justify-center items-center bg-[#D6D6D6] p-2"
                        placeholder="(012) 345 67-89"
                        onChange={(e) => field.onChange(formatAzerbaijaniNumber(e.target.value))}
                    />
                )}
            />
        </div>
    );
}