import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearchAndAddModal.css';

function MovieSearchAndAddModal({onClose, onMovieAdded}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/movie-search?query=${query}`);
            console.log(response.data);
            setResults(response.data.content);
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAdd = async (movie) => {
        if (!window.confirm("영화를 추가하시겠습니까?")) {
            return;
        }

        try {
            await axios.post(`/api/admin/movies`, movie);
            alert("영화를 등록했습니다.");
            onMovieAdded();
        } catch (err) {
            alert(err.response.data);
            console.log(err.response.data);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>영화 검색 및 추가</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="영화 제목을 입력하세요"
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? '검색 중' : '검색'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div className="search-results">
                    {results.map((movie) => (
                        <div key={movie.docid}>
                            <img src={movie.posterUrl} alt={movie.title}/>
                            <h4>{movie.title}</h4>
                            <button onClick={() => handleAdd(movie)}>추가</button>
                        </div>
                    ))}
                </div>

                <button onClick={onClose} className="close-button">닫기</button>
            </div>
        </div>
    );

}

export default MovieSearchAndAddModal;