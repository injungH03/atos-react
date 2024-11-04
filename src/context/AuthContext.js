import React, { createContext, useState, useEffect } from 'react';
import { setLogoutCallback } from '../utils/axios_api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
        userId: null
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuthState = () => {
            const authStatus = localStorage.getItem('isAuthenticated') === 'true';
            const role = localStorage.getItem('userRole');
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('jwt');
            
            setAuth({
                isAuthenticated: authStatus && !!token,
                role: role,
                userId: userId,
            });
            setIsLoading(false); 
        };

        loadAuthState();
    }, []);

    const login = (role, userId) => {
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', userId);
        localStorage.setItem('isAuthenticated', 'true');
        setAuth({
            isAuthenticated: true,
            role: role,
            userId: userId
        });
    };

    const logout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('jwt');
        setAuth({
            isAuthenticated: false,
            role: null,
            userId: null
        });
    };

    useEffect(() => {
        setLogoutCallback(logout); // Axios 인터셉터에 로그아웃 함수 전달
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
