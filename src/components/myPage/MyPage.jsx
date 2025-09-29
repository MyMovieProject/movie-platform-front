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
                await axios.get('/mypage');
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
            </div>
        </div>
    );
}

export default MyPage;