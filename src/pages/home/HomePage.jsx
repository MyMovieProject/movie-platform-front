import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'

function HomePage() {
    // 상태 관리
    const [movies, setMovies] = useState([]); // 현재 페이지의 영화 목록
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 데이터 로딩을 위한 useEffect
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true); // 데이터 요청 시작 시 로딩 상태로 변경
                // Spring Boot API에 현재 페이지 번호와 페이지 크기를 파라미터로 요청
                const response = await axios.get(`/movies?page=${currentPage}&size=10`);
                console.log('서버 응답 데이터:', response.data);

                // API 응답에서 영화 목록과 전체 페이지 수를 state에 저장
                setMovies(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err); // 에러 발생 시 에러 상태에 저장
                console.error("영화 목록을 불러오는 중 오류 발생:", err);
            } finally {
                setLoading(false); // 요청 완료 후 로딩 상태 해제
            }
        };

        fetchMovies();
    }, [currentPage]); // currentPage가 변경될 때마다 useEffect가 다시 실행됨

    // 페이지 변경 핸들러
    const handlePrevPage = () => {
        // 현재 페이지가 0보다 클 때만 이전 페이지로 이동
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        // 현재 페이지가 전체 페이지 수보다 작을 때만 다음 페이지로 이동
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
    };

    // 렌더링 로직
    if (loading) {
        return <div className="loading">영화를 불러오는 중...</div>;
    }

    if (error) {
        return <div className="error">오류가 발생했습니다. 나중에 다시 시도해주세요.</div>;
    }

    return (
        <div className="home-container">
            <h1>영화 플랫폼</h1>
            <div className="movie-grid">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={movie.posterUrl || 'https://via.placeholder.com/150'} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 0}>
                    이전
                </button>
                <span>
                    페이지 {currentPage + 1} / {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                    다음
                </button>
            </div>
        </div>
    );
}

export default HomePage;