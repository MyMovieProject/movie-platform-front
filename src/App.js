import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import MyPage from "./pages/myPage/MyPage";
import MyInfo from "./pages/myPage/buttonPages/MyInfo";
import MyReservations from "./pages/myPage/buttonPages/MyReservations";
import MyInfoEdit from "./pages/myPage/buttonPages/MyInfoEdit";

function App() {
    return (
            <Routes>
                {/* Layout을 사용하는 페이지들 */}
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/mypage/me" element={<MyInfo />} />
                    <Route path="/mypage/edit" element={<MyInfoEdit />} />
                    <Route path="/mypage/reservations" element={<MyReservations />} />
                    {/* 다른 페이지들... */}
                </Route>
                {/* Layout을 사용하지 않는 독립적인 페이지 */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
    );
}

export default App;