import React, { createContext, useState } from "react";

// Tạo context
export const UserContext = createContext();

// Provider dùng để bọc quanh App
export const UserProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState(
        (localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : null
    ); // null nếu chưa login

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};