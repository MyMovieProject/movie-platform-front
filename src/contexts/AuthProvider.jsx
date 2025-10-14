import React, { createContext, useState, useEffect } from 'react';
import apiClient from "../api/AxiosConfig";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // 앱 시작 시, 서버에 현재 로그인 상태인지 확인 요청 (새로고침해도 로그인 유지)
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await apiClient.get('/api/user/me');
                setUser(response.data);
            } catch (error) {
                setUser(null);
            }
        };
        checkLoginStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);

            const response = await apiClient.post('/login', params);
            setUser(response.data);
            return response;
        } catch (error) {
            setUser(null);
            throw error;
        }
    };

    const logout = async () => {
        await apiClient.post('/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}