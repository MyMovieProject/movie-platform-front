import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearchModal.css'; // 3단계에서 만들 CSS 파일

function MovieSearchModal({ onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault(); // form의 기본 새로고침 동작 방지
        if (!query) return;

        setLoading(true);
        try {
            const response = await axios.get(`/api/movie-search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            alert("영화를 검색하는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* 실제 모달 컨텐츠 (이벤트 버블링을 막아 오버레이 클릭 시 닫히지 않게 함) */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>영화 검색</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="영화 제목을 입력하세요"
                    />
                    <button type="submit">검색</button>
                </form>

                <div className="search-results">
                    {loading ? <p>검색 중...</p> : (
                        results.map(movie => (
                            <div key={movie.id} className="result-item">
                                <img src={movie.posterUrl} alt={movie.title} />
                                <span>{movie.title} ({movie.releaseDate})</span>
                                <button>추가</button>
                            </div>
                        ))
                    )}
                </div>

                <button onClick={onClose} className="close-button">닫기</button>
            </div>
        </div>
    );
}

export default MovieSearchModal;