import Image from "next/image";

export function Hero() {
    return (
        <div className="bg-[#101010] w-[77%] h-[197px] overflow-hidden rounded-[30px] flex flex-row justify-evenly items-center gap-[20px] p-[20px] mb-[14px]">
            <div className="text-white font-[600] text-[30px] flex flex-col justify-center text-center">
                <div>
                    Аксессуары для
                </div>
                <div>
                    Iphone 13 Pro Max
                </div>
            </div>
            <Image src="/iphone-13.png" alt="image" width={321} height={500} className="transform translate-[15%]"/>
        </div>
    );
}