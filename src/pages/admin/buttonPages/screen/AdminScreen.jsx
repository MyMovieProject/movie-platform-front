import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import Pagination from "../../../../components/paging/Pagination";
import ScreenAddModal from "./ScreenAddModal";

function AdminScreen () {

    const [searchParams, setSearchParams] = useSearchParams();
    const [screens, setScreens] = useState([]);

    const initialPage = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchScreens = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/admin/screens?page=${currentPage}`);
            console.log(response.data);
            setScreens(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchScreens();
    }, [fetchScreens]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page: page });
    };

    const handleScreenAdded = () => {
        setIsModalOpen(false);
        fetchScreens();
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className="AdminScreenContainer">
            <h1>상영관 관리</h1>

            <div className="screenAdd">
                <button onClick={() => setIsModalOpen(true)}>새 상영관 추가</button>
            </div>

            <table className="screens">
                <thead>
                <tr>
                    <td>아이디</td>
                    <td>이름</td>
                    <td>상세</td>
                </tr>
                </thead>
                <tbody>
                {screens.map(screen => (
                    <tr key={screen.id}>
                        <td>{screen.id}</td>
                        <td>{screen.name}</td>
                        <td>
                            <Link to={`/admin/screens/${screen.id}`}>상영정보</Link>
                        </td>
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
                <ScreenAddModal
                    onClose={() => setIsModalOpen(false)}
                    onScreenAdded={handleScreenAdded}
                />
            )}
        </div>

    );
}

export default AdminScreen;