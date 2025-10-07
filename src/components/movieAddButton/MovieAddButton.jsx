import React, { useState } from 'react';
import MovieSearchModal from './MovieSearchModal'; // 2단계에서 만들 모달 컴포넌트

function MovieAddButton() {
    // 모달의 open/close 상태를 관리하는 state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달을 여는 함수
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달을 닫는 함수 (이 함수를 자식에게 props로 넘겨줄 겁니다)
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal} className="add-movie-button">
                영화 추가
            </button>
            {isModalOpen && <MovieSearchModal onClose={closeModal} />}
        </div>
    );
}

export default MovieAddButton;