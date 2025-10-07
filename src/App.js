import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import MyPage from "./pages/myPage/MyPage";
import MyInfo from "./pages/myPage/buttonPages/MyInfo";
import MyReservations from "./pages/myPage/buttonPages/MyReservations";
import MyInfoEdit from "./pages/myPage/buttonPages/MyInfoEdit";
import ReservationDetail from "./pages/myPage/buttonPages/ReservationDetail";
import SignUpPage from "./pages/signupPage/SignUpPage";
import MovieDetail from "./pages/moviePage/MovieDetail";
import ShowingPage from "./pages/showingsPage/ShowingPage";
import ReservationPage from "./pages/reservationPage/ReservationPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminMovies from "./pages/admin/buttonPages/AdminMovies";
import AdminScreen from "./pages/admin/buttonPages/AdminScreen";
import AdminScreenDetail from "./pages/admin/buttonPages/AdminScreenDetail";

function App() {
    return (
            <Routes>
                {/* Layout을 사용하는 페이지들 */}
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/mypage/me" element={<MyInfo />} />
                    <Route path="/mypage/edit" element={<MyInfoEdit />} />
                    <Route path="/mypage/reservations" element={<MyReservations />} />
                    <Route path="/mypage/reservations/:reservationId" element={<ReservationDetail />} />
                    <Route path="/movies/:movieId" element={<MovieDetail />} />
                    <Route path="/movies/:movieId/showings" element={<ShowingPage />} />
                    <Route path="/movies/:movieId/showings/:showingInfoId/reservations" element={<ReservationPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/movies" element={<AdminMovies />} />
                    <Route path="/admin/screens" element={<AdminScreen />} />
                    <Route path="/admin/screens/:screenId" element={<AdminScreenDetail />} />
                </Route>
                {/* Layout을 사용하지 않는 독립적인 페이지 */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
    );
}

export default App;