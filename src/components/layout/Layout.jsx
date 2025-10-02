import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import './Layout.css';

function Layout() {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />                 {/* 자식이 들어갈 곳*/}
            </main>
        </div>
    );
}

export default Layout;