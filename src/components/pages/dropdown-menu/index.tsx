"use client";

import {Accordion, AccordionItem} from "@/components/ui/accordion";
import React, {useEffect, useState} from "react";
import {baseApiUrl} from "@/app/urls";
import {redirect} from "next/navigation";

interface Category {
    id: string;
    name: string;
}

type AccordionData = Record<string, Category[]>; // brandName -> categories[]

interface DropdownMenuProps {
    isOpen: boolean;
}

export function DropdownMenu({isOpen}: DropdownMenuProps) {
    const [data, setData] = useState<AccordionData>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${baseApiUrl}/ui/accordion`); // adjust endpoint
                if (!res.ok) throw new Error("Failed to fetch accordion data");
                const json: AccordionData = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div
            className={`absolute w-full h-max top-7 text-[#1C1C27] bg-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-b-[30px] z-50
                transition-all duration-300
                ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            `}
        >
            <Accordion>
                {Object.entries(data).map(([brandName, categories]) => (
                    <AccordionItem key={brandName} name={brandName}>
                        <>
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    onClick={() => {
                                        redirect(`/?brand=${brandName}&category=${cat.name}`)
                                    }}
                                    className="cursor-pointer hover:text-black text-[15px] text-[#555]"
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}