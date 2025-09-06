'use client';

import React, {createContext, createRef, useContext, useEffect, useRef, useState} from 'react';

type DropdownMenuContextType = {
    isOpen: boolean;
    toggle: () => void;
    ref: React.RefObject<HTMLDivElement | null>;
};

const defaultValues: DropdownMenuContextType = {
    isOpen: false,
    toggle: () => {},
    ref: createRef<HTMLDivElement>()
};

const DropdownMenuContext = createContext<DropdownMenuContextType>(defaultValues);

export function useDropdownMenu() {
    return useContext(DropdownMenuContext);
}

type DropdownMenuProviderProps = {
    children: React.ReactNode;
};

export function DropdownMenuProvider({ children }: DropdownMenuProviderProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <DropdownMenuContext.Provider value={{ isOpen, toggle, ref }}>
            {children}
        </DropdownMenuContext.Provider>
    );
}