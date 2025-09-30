import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import Pagination from "../../../components/paging/Pagination";

function MyReservations () {
    const [reservations, setReservations] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`/api/mypage/reservations?page=${currentPage}&size=10`);
                console.log(response.data)
                setReservations(response.data.content)
                setTotalPages(response.data.totalPages)
            } catch(error) {
                setError(error.response.data)
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    const handleCancleSubmit = async (reservationId) => {
        if (window.confirm("정말 예매를 취소하시겠습니까?")) {
            try {
                await axios.delete(`/api/reservations/${reservationId}`);
                alert('예매가 성공적으로 취소되었습니다.');
            } catch (error) {
                const errorMessage = error.response.data;
                alert(errorMessage);
            }
        }
    }

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="reservations-container">
            <h1>나의 예매 내역</h1>
            <table className="reservations-table">
                <thead>
                <tr>
                    <th>예매 번호</th>
                    <th>상영 날짜</th>
                    <th>가격</th>
                    <th>상태</th>
                    <th>상세보기</th>
                    <th>취소</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map(reservation => (
                    <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.totalPrice.toLocaleString()}원</td>
                        <td>{reservation.status}</td>
                        <td>
                            <Link to={`/mypage/reservations/${reservation.id}`}>예매 상세</Link>
                        </td>
                        <td>
                            <button
                                className="cancel-button"
                                onClick={() => handleCancleSubmit(reservation.id)}
                            >
                                예매 취소
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default MyReservations;