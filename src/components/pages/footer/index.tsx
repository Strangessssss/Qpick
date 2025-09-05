import {Globe, Instagram, InstagramIcon} from "lucide-react";
import Image from "next/image";

export function Footer() {
    return(
      <div className="widht-full h-[60px] flex justify-center md-[22px] mt-[60px]">
          <div className="flex w-[77%] h-[149px] justify-evenly items-center bg-white rounded-t-[30px]">
                <div className="font-[700] text-[25px]">QPICK</div>
                <div className="flex flex-col gap-[11px] text-[17px] font-[400]">
                    <div>
                        Избранное
                    </div>
                    <div>
                        Корзина
                    </div>
                    <div>
                        Контакты
                    </div>
                </div>
                <div className="flex flex-col gap-[11px] text-[17px] font-[400] font-regular">
                    <div className="m-2">
                        Условия сервиса
                    </div>
                    <div className="flex flex-row items-center gap-[15px]">
                        <Globe color="#838383" height="17px"/>
                        <div className="font-[500] text-[15px]">
                            Eng
                        </div>
                        <div className="font-[700] text-[15px] text-[#FFA542]">
                            Рус
                        </div>
                        <div className="font-[500] text-[15px]">
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
