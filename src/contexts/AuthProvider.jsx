import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
import apiClient, { setAuthContextRef } from '../api/AxiosConfig';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // 렌더링과 관계없이 값을 저장하는 보관함
    const accessTokenRef = useRef(null);

    const [user, setUser] = useState(null);

    const setAccessToken = (token) => {
        accessTokenRef.current = token;
        console.log(token);
    };

    const getAccessTokenFromMemory = useCallback(() => {
        return accessTokenRef.current;
    }, []);

    const fetchUser = useCallback(async () => {
        try {
            const response = await apiClient.get('/api/user/me');

            if (response.status === 204 || !response.data) {
                setUser(null);
            } else {
                setUser(response.data);
            }
        } catch (error) {
            setUser(null);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);

            const response = await apiClient.post('/api/login', params);

            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);

            await fetchUser();
            return response;
        } catch (error) {
            setUser(null);
            setAccessToken(null);
            throw error;
        }
    };

    const logout = useCallback(async () => {
        try {
            await apiClient.post('/api/logout');
        } catch (error) {
            console.error("Logout API Error:", error);
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    }, []);

    useEffect(() => {
        // axios config에 함수 전달
        setAuthContextRef({ getAccessTokenFromMemory, setAccessToken, logout });

        const initializeAuth = async () => {
            try {
                const refreshResponse = await apiClient.post('/api/auth/refresh');
                setAccessToken(refreshResponse.data.accessToken);
                await fetchUser();
            } catch (err) {
                console.log("자동 로그인 실패:", err.response?.data);
                logout();
            }
        };
        initializeAuth();
    }, [getAccessTokenFromMemory, fetchUser, logout]);

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}