import {useEffect, useState} from "react";
import axios from 'axios';

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
            <ul className="reservations-list">
                {reservations.content.map(reservation => (
                    <li key={reservation.id} className="reservation-item">
                        <p><strong>아이디:</strong> {reservation.id}</p>
                        <p><strong>상영 날짜:</strong> {reservation.reservationDate}</p>
                        <p><strong>가격:</strong> {reservation.totalPrice}</p>
                        <p><strong>상태:</strong> {reservation.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default MyReservations;