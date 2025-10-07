import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/paging/Pagination";
import MovieAddButton from "../../../components/movieAddButton/MovieAddButton";

function AdminMovies () {

    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const initialPage = parseInt(searchParams.get('page')) || 0;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/admin/movies?page=${currentPage}`);
                console.log(response.data.content);
                setMovies(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(err.data.response);
                console.log(err.data.response);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page });
    };

    if (loading) {
        return <div className="loading">로딩중</div>;
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="AdminMovieContainer">
            <h1>영화 관리</h1>
            <table className="movies">
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>제목</th>
                    <th>포스터</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>
                            <img src={movie.posterUrl} alt={movie.title} style={{width: '60px'}}/>
                        </td>
                        <td>
                            <Link to={`/admin/movies/${movie.id}`}>영화 상세</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <MovieAddButton></MovieAddButton>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default AdminMovies;