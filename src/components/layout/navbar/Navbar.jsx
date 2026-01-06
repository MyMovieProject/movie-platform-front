import React, {useContext} from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const {user, logout} = useContext(AuthContext); // AuthContext 에서 유저 상태를 가져옴
    const navigate = useNavigate();

    const loginClick = () => {
        navigate('/login');
    };

    const logoutClick = () => {
        logout();
        navigate('/');
    }

    const signUpClick = () => {
        navigate('/sign');
    }

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <Link to="/">Movie Platform</Link>
            </div>
            <div className="navbar-menu">
                {user ? (
                    <>
                        <Link to ="/mypage" className="nav-link">마이페이지</Link>
                        <button onClick={logoutClick} className="nav-button">로그아웃</button>
                    </>
                ) : (
                    <>
                        <button onClick={loginClick} className={"nav-button"}>로그인</button>
                        <button onClick={signUpClick} className={"nav-button"}>회원가입</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navbar;