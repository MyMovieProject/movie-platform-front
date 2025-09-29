import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

function MyReservations () {
    const [reservations, setReservations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/mypage/reservations');
                console.log(response.data)
                setReservations(response.data)
            } catch(error) {
                setError(error.response.data.message)
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

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
                </tr>
                </thead>
                <tbody>
                {reservations.content.map(reservation => (
                    <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.reservationDate}</td>
                        <td>{reservation.totalPrice.toLocaleString()}원</td>
                        <td>{reservation.status}</td>
                        <td>
                            <Link to={`/mypage/reservations/${reservation.id}`}>예매 상세</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyReservations;