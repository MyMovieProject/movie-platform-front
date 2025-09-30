import {useEffect, useState} from "react";
import axios from 'axios';

function MyInfo () {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async  () => {
            try {
                const response = await axios.get('/api/mypage/me');
                console.log(response.data)
                setUserInfo(response.data)
            } catch(error) {
                setError(error.response.data)
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div>
            <h1>내 정보</h1>
            {userInfo && (
                <div className="user-info-card">
                    <p><strong>이름:</strong> {userInfo.name}</p>
                    <p><strong>이메일:</strong> {userInfo.email}</p>
                    <p><strong>연락처:</strong> {userInfo.phoneNumber}</p>
                    <p><strong>생일:</strong> {userInfo.birthDay}</p>
                </div>
            )}
        </div>
    );

}

export default MyInfo;