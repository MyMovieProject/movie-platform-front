import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './Layout.css';

function Layout() {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            {/* <Footer /> */} {/* 나중에 푸터를 추가할 자리 */}
        </div>
    );
}

export default Layout;