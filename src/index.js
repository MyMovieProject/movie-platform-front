// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthProvider'; // 1. AuthProvider import
import { BrowserRouter } from 'react-router-dom';   // 2. BrowserRouter import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* 3. AuthProvider가 최상위에서 앱 전체를 감싸도록 수정 */}
        <AuthProvider>
            {/* 4. BrowserRouter도 여기서 감싸주면 구조가 더 명확해짐 */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();