import React, {useEffect, useState} from 'react';
import './MovieSearchAndAddModal.css';
import Pagination from "../../../../components/paging/Pagination";
import apiClient from "../../../../api/AxiosConfig";

function MovieSearchAndAddModal({onClose, onMovieAdded}) {
    const [query, setQuery] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchKeyword.trim()) {
            return;
        }

        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiClient.get(`/api/movie-search?query=${searchKeyword}&page=${page}`);
                setResults(response.data.content);
                setTotalCount(response.data.totalElements);
            } catch (err) {
                setError(err.response.data || "데이터를 불러오는 중 오류가 발생했습니다.");
                console.log(err.response.data);
                setResults([]);
                setTotalCount(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [searchKeyword, page]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }
        setPage(1);
        setSearchKeyword(query);
    };

    const handleAdd = async (movie) => {
        if (!window.confirm("영화를 추가하시겠습니까?")) {
            return;
        }

        try {
            await apiClient.post(`/api/admin/movies`, movie);
            alert("영화를 등록했습니다.");
            onMovieAdded();
        } catch (err) {
            alert(err.response.data);
            console.log(err.response.data);
        }
    }

    const pageSzie = 10;
    const totalPages = Math.ceil(totalCount / pageSzie);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>영화 검색 및 추가</h2>
                <form onSubmit={handleSearchSubmit}>
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

                {totalCount > 0 && !isLoading && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}

                <button onClick={onClose} className="close-button">닫기</button>
            </div>
        </div>
    );

}

export default MovieSearchAndAddModal;