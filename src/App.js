import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/loginPage/LoginPage';

function App() {
    return (
            <Routes>
                {/* Layout을 사용하는 페이지들 */}
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    {/* 다른 페이지들... */}
                </Route>
                {/* Layout을 사용하지 않는 독립적인 페이지 */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
    );
}

export default App;