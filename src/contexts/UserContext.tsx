'use client';

import React, {createContext, createRef, useContext, useEffect, useRef, useState} from 'react';
import User from "@/types/user";

type UserContextType = {
    user: User | null;
    update: () => void
};

const defaultValues: UserContextType = {
    user: null,
    update: () => {},
};

const UserContext = createContext<UserContextType>(defaultValues);

export function useUserContext() {
    return useContext(UserContext);
}

type UserContextProviderProps = {
    children: React.ReactNode;
};

export function UserContextProvider({ children }: UserContextProviderProps) {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        update().then();
    }, []);

    const update = async () => {
        const id = localStorage.getItem("user");
        fetch("http://localhost:5200/api/users/" + (id? id: ""))
            .then((res) => res.json())
            .then((data: User) => {
                setUser(data);
                localStorage.setItem("user", data.id);
            })
            .catch((err) => console.error("Fetch error:", err));

        return;
    }

    return (
        <UserContext.Provider value={{ user, update }}>
            {children}
        </UserContext.Provider>
    );
}