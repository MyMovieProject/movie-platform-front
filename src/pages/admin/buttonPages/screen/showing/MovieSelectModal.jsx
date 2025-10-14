import React, {useEffect, useState} from "react";
import Pagination from "../../../../../components/paging/Pagination";
import './MovieSelectModal.css';
import apiClient from "../../../../../api/AxiosConfig";

function MovieSelectModal ({ onClose, onSelectMovie }) {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(`/api/movies?page=${currentPage}`);
                setMovies(response.data.content);
                setTotalPage(response.data.totalPages);
            } catch (error) {
                console.error("영화 목록을 불러오는 데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [currentPage]);

    const handleMovieSelect = (movie) => {
        onSelectMovie(movie);
        onClose();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>영화 선택</h2>
                {loading ? (
                    <div>로딩 중...</div>
                ) : (
                    <ul>
                        {movies.map(movie => (
                            <li key={movie.id} onClick={() => handleMovieSelect(movie)}>
                                <img src={movie.posterUrl} alt={movie.title} />
                                <span>{movie.title}</span>
                                <button onClick={() => handleMovieSelect(movie)}>선택</button>
                            </li>
                        ))}
                    </ul>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default MovieSelectModal;