import Image from "next/image";
import React, {useState} from "react";
import {redirect, useRouter} from "next/navigation";

interface IndicatorIconProps {
    isOpen: boolean;
}

function IndicatorIcon(props: IndicatorIconProps) {
    return <Image width={10} height={7} src={"/icons/arrow.svg"} alt="arrow"
                  className={`transition-transform duration-500 ${props.isOpen ? "rotate-0" : "rotate-180"}`}
    />
}

interface AccordionItemProps {
    name: string;
    children: React.ReactNode;
}


export function AccordionItem(props: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const Indicator = () => <IndicatorIcon isOpen={isOpen}/>;

    const handleClick = () => {
        toggle();
    }

    return(
        <div className="w-full">
            <div
                className="text-[17px] text-left text-[#555] font-[500] w-full h-full flex justify-between items-center cursor-pointer">
                <div onClick={() => redirect(`/?brand=${props.name}`)} className="hover:text-black text-[15px]">
                    {props.name}
                </div>
                <div className="p-3" onClick={handleClick}>
                    <Indicator />
                </div>
            </div>
            <div className={`flex flex-col pl-[19px] gap-[10px] overflow-hidden transition-all duration-500
             ${isOpen ? "max-h-[500px] opacity-100 pt-[12px]" : "max-h-0 opacity-0 pt-0"} `}>
                {props.children}
            </div>
        </div>
    )
}

interface AccordionProps {
    children: React.ReactNode;
}

export function Accordion({children}: AccordionProps) {
    return (
        <div className="w-[59%] mt-[19px] ml-[19px] mb-[20px] flex flex-col gap-[10px]">
            {children}
        </div>
    )
}