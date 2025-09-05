"use client"

import Image from "next/image";
import React, {useState} from "react";

interface IndicatorIconProps {
    isOpen: boolean;
}

function IndicatorIcon(props: IndicatorIconProps) {
    return <Image width={10} height={7} src={"/icons/arrow.svg"} alt="arrow"
                  className={`transition-transform duration-500 ${props.isOpen ? "rotate-0" : "rotate-180"}`}
        />
}

function Accordion() {
    return (
        <div className="w-[59%] mt-[19px] ml-[19px] flex flex-col">
            <AccordionItem name="Apple"/>
        </div>
    )
}

interface AccordionItemProps {
    name: string;
}

function AccordionItem(props: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const Indicator = () => <IndicatorIcon isOpen={isOpen}/>;

    const handleClick = () => {
        toggle();
    }

    return(
        <div className="w-full mb-[10px]">
            <div className="text-[17px] text-left text-[#1C1C27] font-[500] w-full h-full flex justify-between items-center">
                <div>
                    {props.name}
                </div>
                <button onClick={handleClick}>
                    <Indicator/>
                </button>
            </div>
            <div className={`ml-[19px] mt-[12px] flex flex-col gap-[10px] ${isOpen ? "": "hidden"}`}>
                <div>
                    Iphone
                </div>
                <div>
                    Airpods
                </div>
                <div>
                    Watch
                </div>
            </div>
        </div>
    )
}


export function DropdownMenu() {
    return(
        <div className="absolute w-full h-[512px] top-7 text-[#1C1C27] bg-[#EAEAEA] shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-b-[30px]">
            <Accordion/>
        </div>
    );
}
