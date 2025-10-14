import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/paging/Pagination";
import MovieSearchAndAddModal from "./MovieSearchAndAddModal";

function AdminMovies () {

    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);

    const initialPage = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMovies = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/admin/movies?page=${currentPage}`);
            setMovies(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page });
    };

    const handleMovieAdded = () => {
        setIsModalOpen(false);
        fetchMovies();
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

            <div className="movieAdd">
                <button onClick={() => setIsModalOpen(true)}>새 영화 추가</button>
            </div>

            <table className="movies">
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>제목</th>
                    <th>포스터</th>
                    {/*<th>상세보기</th>*/}
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
                        {/*<td>*/}
                        {/*    <Link to={`/admin/movies/${movie.id}`}>영화 상세</Link>*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isModalOpen && (
                <MovieSearchAndAddModal
                    onClose={() => setIsModalOpen(false)}
                    onMovieAdded={handleMovieAdded}
                />
            )}
        </div>
    )
}

export default AdminMovies;