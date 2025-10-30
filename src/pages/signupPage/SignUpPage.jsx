import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../api/AxiosConfig";

function SignUpPage() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userBirth, setUserBirth] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (userName.length < 2) {
            setError("이름은 2글자 이상 입력해주세요.");
            return;
        }

        if (userPassword.length < 8) {
            setError("비밀번호는 8자 이상 입력해주세요.");
            return;
        }

        if (!userEmail.includes('@')) {
            setError("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        if (userPhone.length !== 11) {
            setError("올바른 전화번호를 입력해주세요.")
            return;
        }

        try {
            const signupData = {
                username: userName,
                email: userEmail,
                password: userPassword,
                phoneNumber: userPhone,
                birthDay: userBirth
            }

            await apiClient.post('/api/signup', signupData);

            alert('회원가입에 성공했습니다');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || '잠시 후에 시도해주십시오.');
        }
    }

    return (
        <div className="SignupContainer">
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <h1>회원가입</h1>
                <div className="input-group">
                    <label htmlFor={userEmail}></label>
                    <input
                        type="text"
                        placeholder="이메일"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor={userPassword}></label>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor={userName}></label>
                    <input
                        type="text"
                        placeholder="이름"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor={userPhone}></label>
                    <input
                        type="tel"
                        placeholder="전화번호(-을 제외하고 입력해주세요)"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor={userBirth}></label>
                    <input
                        type="date"
                        placeholder="생년월일"
                        value={userBirth}
                        onChange={(e) => setUserBirth(e.target.value)}
                        max={today}
                        required
                    />
                </div>
                <button type="submit">가입하기</button>
            </form>
        </div>
    );

}

export default SignUpPage;