import React, { useState, useContext} from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import './LoginPage.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);

        try {
            const response = await axios.post('/login', params);
            console.log('로그인 성공:', response);
            login(response.data);
            navigate('/');
        } catch (err) {
            console.log(email, password);
            console.error('로그인 실패:', err);
            setError(err.response.data.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>로그인</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-page-button">로그인</button>
            </form>
        </div>
    );
}


export default LoginPage;