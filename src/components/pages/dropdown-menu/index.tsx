"use client"


import {Accordion, AccordionItem} from "@/components/ui/accordion";

interface DropdownMenuProps {
    isOpen: boolean;
}

export function DropdownMenu({isOpen}: DropdownMenuProps) {
    return(
        <div className={`absolute w-full h-[512px] top-7 text-[#1C1C27] bg-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-b-[30px] z-50
            transition-all duration-300
            ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            `}>
            <Accordion>
                <AccordionItem name="Apple">
                    <>
                        <div>
                            Iphone
                        </div>
                        <div>
                            Airpods
                        </div>
                        <div>
                            Watch
                        </div>
                    </>
                </AccordionItem>
                <AccordionItem name="Apple">
                    <>
                        <div>
                            Iphone
                        </div>
                        <div>
                            Airpods
                        </div>
                        <div>
                            Watch
                        </div>
                    </>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
