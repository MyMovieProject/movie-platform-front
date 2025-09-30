import {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyInfoEdit () {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDay, setBirthDay] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async  () => {
            try {
                const response = await axios.get('/api/mypage/me');
                const userData = response.data;

                setName(userData.name);
                setPhoneNumber(userData.phoneNumber);
                setBirthDay(userData.birthDay);

                console.log(birthDay);
            } catch(error) {
                setError(error.response.data.message)
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUserInfo = { name, phoneNumber, birthDay };

        console.log(updatedUserInfo);

        try {
            // 4. 서버에 PUT 또는 PATCH 요청으로 수정된 정보를 보냅니다.
            await axios.put('/api/mypage', updatedUserInfo);

            alert('정보가 성공적으로 수정되었습니다.');
            navigate('/mypage/me'); // 수정 완료 후 마이페이지로 이동
        } catch (err) {
            setError(err.response?.data?.message || "정보 수정에 실패했습니다.");
            console.error("정보 수정 실패:", err);
        }
    }


    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="form-container">
            <form className="edit-form" onSubmit={handleSubmit}>
                <h1>내 정보 수정</h1>
                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phoneNumber">연락처</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="birthDay">생년월일</label>
                    <input
                        type="date"
                        id="birthDay"
                        value={birthDay}
                        onChange={(e) => setBirthDay(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">정보 수정 완료</button>
            </form>
        </div>
    );

}

export default MyInfoEdit;