"use client"

import React, {use} from "react";
import {useTranslations} from "use-intl";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const t = useTranslations();

    return (
        <div className="flex flex-col items-center gap-[22px] mt-[29px] w-full">
            <div className="w-[77%] h-[95px] bg-white rounded-[30px] font-bold flex flex-col items-center justify-center relative gap-[20px] p-[20px]">
                {t("orderConfirmation", {id})}
            </div>
        </div>
    );
}