import Image from "next/image";
import {useTranslations} from "use-intl";


export function Hero() {
    const t = useTranslations();
    return (
        <div className="bg-[#101010] w-[77%] h-[197px] overflow-hidden rounded-[30px] flex flex-row justify-evenly items-center gap-[20px] p-[20px] mb-[14px]">
            <div className="text-white font-[600] text-[30px] flex flex-col justify-center text-center">
                <div>
                    {t(`accessories-for`)}
                </div>
            </div>
            <Image src="/iphone-13.png" alt="image" width={321} height={500} className="transform translate-[15%]"/>
        </div>
    );
}