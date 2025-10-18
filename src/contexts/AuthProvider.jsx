import React, { createContext, useState, useEffect } from 'react';
import apiClient from "../api/AxiosConfig";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
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
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', password);

            const response = await apiClient.post('/api/login', params);
            await fetchUser();
            return response;
        } catch (error) {
            setUser(null);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiClient.post('/api/logout');
        } catch (error) {
            console.error("Logout API Error:", error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}