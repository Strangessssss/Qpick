"use client";

import React, { useEffect } from "react";
import { CartCard } from "@/components/ui/cart-card";
import { DeliveryMap } from "@/components/ui/delivery-map";
import { useUserContext } from "@/contexts/UserContext";
import Image from "next/image";
import {redirect, useRouter} from "next/navigation";
import PlaceOrder from "@/components/pages/place-order";
import PhoneNumber from "@/components/pages/phone-number";
import PaymentMethod from "@/components/pages/payment-method";
import { FormProvider, useForm } from "react-hook-form";
import LatLng from "@/types/lat-lng";
import { baseApiUrl } from "@/app/urls";
import toast from "react-hot-toast";

type CartFormData = {
    phone: string;
    paymentMethod: string;
    promoCode: string;
    deliveryType: string;
    location: LatLng | null;
};

export default function Cart() {
    const { user, update } = useUserContext();

    const router = useRouter();

    const methods = useForm<CartFormData>({
        defaultValues: {
            phone: "",
            paymentMethod: "",
            promoCode: "",
            deliveryType: "store",
            location: null,
        },
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        update();
    }, []);

    const onSubmit = async (data: CartFormData) => {
        try {
            const formData = new FormData();
            formData.append("phone", data.phone);
            formData.append("paymentMethod", data.paymentMethod);
            formData.append("promoCode", data.promoCode);
            formData.append("deliveryType", data.deliveryType);
            formData.append("location", JSON.stringify(data.location));

            const res = await fetch(`${baseApiUrl}/users/${user?.id}/checkout`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                let errorMessage;
                try {
                    const data = await res.json();
                    errorMessage = data?.message || data;
                } catch {
                    errorMessage = await res.text();
                }

                throw new Error(errorMessage);
            }

            const orderId = await res.json();

            toast.success("Заказ успешно оформлен 🎉");

            reset();
            router.push(`/orders/${orderId}`);
        } catch (err: any) {
            toast.error(err.message || "Что-то пошло не так ❌");
        }
    };

    if (!user?.cartProducts || user.cartProducts.length === 0) {
        return (
            <div className="flex justify-center items-center flex-col w-full h-full flex-1">
                <div className="w-[40%] aspect-square relative">
                    <Image
                        src="/empty-cart.png"
                        alt="empty-saved"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="font-[500] text-[30px] text-center w-[40%] mt-[20px]">
                    Корзина пуста
                </div>
                <div className="font-[400] text-[20px] text-center text-[#838383]">
                    Но это никогда не поздно исправить :)
                </div>
                <button
                    onClick={() => redirect("/")}
                    className="w-[540px] h-[65px] bg-black mt-[30px] rounded-[20px] text-white font-[600] text-[20px] flex justify-center items-center cursor-pointer hover:text-black hover:bg-[#FFA542] transition-all duration-300"
                >
                    В каталог товаров
                </button>
            </div>
        );
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full h-full justify-center items-center gap-[22px] mt-[29px]"
            >
                <div className="w-full flex justify-center">
                    <div className="font-[600] text-[20px] text-left w-[77%]">Корзина</div>
                </div>
                <div className="flex justify-evenly flex-row gap-[30px] w-[77%]">
                    <div className="w-[60%] flex flex-col gap-[13px]">
                        <DeliveryMap deliveryPrice={4.99} />
                        {user?.cartProducts.map((product, index) => (
                            <CartCard key={index} product={product} />
                        ))}
                    </div>
                    <div className="w-[40%] flex flex-col gap-[13px]">
                        <PaymentMethod />
                        <PhoneNumber />
                        <PlaceOrder
                            cartPrice={user?.cartPrice}
                            handleSubmit={methods.handleSubmit(onSubmit)}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}