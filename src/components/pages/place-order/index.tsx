import React from "react";

export default function PlaceOrder({cartPrice, handleSubmit}: {cartPrice: number, handleSubmit: () => void}) {
    return (
        <div className="bg-white h-[130px] rounded-[30px] shadow-[0_0_20px_0_#0000001A] flex flex-col justify-center items-center w-full">
            <div className="flex flex-row justify-between items-center p-[21px_23px] w-full font-[600] text-[15px]">
                <div>
                    ИТОГО
                </div>
                <div>
                    {cartPrice} AZN
                </div>
            </div>
            <button onClick={handleSubmit} className="flex flex-1 bg-black w-full rounded-[20px] shadow-[0_0_20px_0_#0000001A] text-white text-[17px] font-[600] justify-center items-center cursor-pointer hover:scale-110 hover:text-black hover:bg-[#FFA542] transition-all duration-300 shake-hover">
                Оформить заказ
            </button>
        </div>
    )
}