"use client"

import {Globe} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "use-intl";

export function Footer() {
    const pathname = usePathname(); // current path: /en/products/123
    const router = useRouter();

    const t = useTranslations();

    const setLocale = (locale: string) => {
        const pathWithoutLocale = pathname.replace(/^\/(en|ru|az)/, "");
        router.push(`/${locale}${pathWithoutLocale}`);
    }

    return(
      <div className="widht-full h-[60px] flex justify-center md-[22px] mt-[60px]">
          <div className="flex w-[77%] h-[149px] justify-evenly items-center bg-white rounded-t-[30px]">
                <Link href="/" className="font-[700] text-[25px] hover:text-[#FFA542] transition-all duration-300">QPICK</Link>
                <div className="flex flex-col gap-[11px] text-[17px] font-[400]">
                    <Link href="/saved" passHref
                          className="hover:text-[#FFA542] transition-all duration-300"
                    >
                        {t("saved")}
                    </Link>
                    <Link href="/cart" passHref
                          className="hover:text-[#FFA542] transition-all duration-300"
                    >
                        {t("cart")}
                    </Link>
                </div>
                <div className="flex flex-col gap-[11px] text-[17px] font-[400] font-regular">
                    <Link href="/privacy"
                          className="hover:text-[#FFA542] transition-all duration-300"
                    >
                        {t("privacy")}
                    </Link>
                    <div className="flex flex-row items-center gap-[15px]">
                        <Globe color="#838383" height="17px"/>
                        <button onClick={() => setLocale("en")} className="font-[500] text-[15px] cursor-pointer transition-all duration-300 hover:text-[#FFA542]">
                            Eng
                        </button>
                        <div onClick={() => setLocale("ru")} className="font-[500] text-[15px] cursor-pointer transition-all duration-300 hover:text-[#FFA542]">
                            Рус
                        </div>
                        <div onClick={() => setLocale("az")} className="font-[500] text-[15px] cursor-pointer transition-all duration-300 hover:text-[#FFA542]">
                            Az
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-[18px] text-[17px] font-[400] font-regular items-start h-full pt-[40px]">
                    <Image src="/icons/instagram.png" alt="instagram" width={20} height={20}/>
                    <Image src="/icons/telegram.png" alt="telegram" width={20} height={20}/>
                    <Image src="/icons/whatsapp.png" alt="whatsapp" width={20} height={20}/>
                </div>
          </div>
      </div>
    );
}
