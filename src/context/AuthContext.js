import React, { createContext, useState, useEffect, useCallback } from 'react';
import { setLogoutCallback, resetSessionExpired } from '../utils/axios_api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
        userId: null,
        name: null,
        loginTime: null
    });

    const [isLoading, setIsLoading] = useState(true);

    const loadAuthState = useCallback(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('jwt');
        const name = localStorage.getItem('name');
        const loginTime = localStorage.getItem('loginTime');
        
        setAuth({
            isAuthenticated: authStatus && !!token,
            role: role,
            userId: userId,
            name: name,
            loginTime: loginTime
        });
        setIsLoading(false); 
    }, []);

    useEffect(() => {
        loadAuthState();
    }, [loadAuthState]);

    const login = (loginInfo) => {
        localStorage.setItem('userRole', loginInfo.role);
        localStorage.setItem('userId', loginInfo.userId);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('jwt', loginInfo.token);
        localStorage.setItem('name', loginInfo.name);
        localStorage.setItem('loginTime', loginInfo.loginTime);

        setAuth({
            isAuthenticated: true,
            role: loginInfo.role,
            userId: loginInfo.userId,
            name: loginInfo.name,
            loginTime: loginInfo.loginTime
        });
    };

    const logout = useCallback(() => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('jwt');
        localStorage.removeItem('name');
        localStorage.removeItem('loginTime');
        setAuth({
            isAuthenticated: false,
            role: null,
            userId: null,
            name: null,
            loginTime: null
        });
        resetSessionExpired();
        loadAuthState();
    }, [loadAuthState]);

    useEffect(() => {
        setLogoutCallback(logout); // Axios 인터셉터에 로그아웃 함수 전달
    }, [logout]);

    return (
        <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
