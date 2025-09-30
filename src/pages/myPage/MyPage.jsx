import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './MyPage.css';

function MyPage () {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const myPage = async () => {
            try {
                await axios.get('/api/mypage');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('로그인이 필요합니다.');
                    navigate('/login');
                } else {
                    setError("페이지를 불러오는 중 오류가 발생했습니다.");
                }
            }
        };

        myPage();
    }, [navigate]);

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
            try {
                await axios.delete('/api/mypage');
                alert('회원 탈퇴가 완료되었습니다.')

                // 로그아웃 로직 추가해야할 듯
                await axios.post('/logout');
                navigate('/');
            } catch (err) {
                console.error("정보 수정 실패:", err);
            }
        }
    }

    if (error) {
        return <div className="error-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="MyPageContainer">
            <h1>마이페이지</h1>
            <div className="mypage-buttons">
                <Link to="/mypage/me" className="mypage-button">내 정보</Link>
                <Link to="/mypage/edit" className="mypage-button">회원 정보 수정</Link>
                <Link to="/mypage/reservations" className="mypage-button">예매 내역 보기</Link>

                <form onSubmit={handleDeleteSubmit} className="delete-form">
                    <button type="submit" className="mypage-button delete-button">회원 탈퇴</button>
                </form>

            </div>
        </div>
    );
}

export default MyPage;