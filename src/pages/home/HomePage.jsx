import React, { useState, useEffect } from 'react';
import './HomePage.css'
import {Link, useSearchParams} from "react-router-dom";
import Pagination from "../../components/paging/Pagination";
import apiClient from "../../api/AxiosConfig";

function HomePage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);

    // 페이지
    const initialPage = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    // 사이즈
    const initialSize = Number(searchParams.get("size")) || 10;
    const [pageSize, setPageSize] = useState(initialSize);

    // 정렬
    const initialSort = searchParams.get("sort") || 'latest';
    const [sort, setSort] = useState(initialSort);

    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/movies?page=${currentPage}&size=${pageSize}&sort=${sort}`);
                console.log('서버 응답 데이터:', response.data);
                setMovies(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.response.data);
                console.error(err.response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage, pageSize, sort]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page, size: pageSize, sort: sort});
    };

    const handleSizeChange = (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        setCurrentPage(1);
        setSearchParams({ page: 1, size: newSize, sort: sort });
    }

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSort(newSort);
        setCurrentPage(1);
        setSearchParams({page: 1, size: pageSize, sort: newSort});
    }

    if (loading) {
        return <div className="loading">로딩중</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="home-container">
            <h1>영화 플랫폼</h1>

            <div className="options-container">
                <select onChange={handleSizeChange} value={pageSize}>
                    <option value="2">2개씩 보기</option>
                    <option value="10">10개씩 보기</option>
                    <option value="20">20개씩 보기</option>
                </select>
                <select onChange={handleSortChange} value={sort}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                    <option value="title">제목순</option>
                </select>
            </div>

            <div className="movie-grid">
                {movies.map(movie => (
                    <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
                        <img src={movie.posterUrl || 'https://via.placeholder.com/150'} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </Link>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default HomePage;