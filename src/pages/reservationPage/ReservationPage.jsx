import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ReservationPage.css';
import ReservationButton from "../../components/reservationButton/ReservationButton";

function ReservationPage() {
    const { showingInfoId } = useParams(null);
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`/api/showings/${showingInfoId}/seats`);
                setInfo(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.response?.data || "알 수 없는 에러가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [showingInfoId]);

    const handleSeatClick = (seat) => {
        if (seat.status !== 'AVAILABLE') {
            alert("이미 예약된 좌석입니다.");
            return;
        }

        const isSelected = selectedSeats.includes(seat.seatId);

        if (isSelected) {
            setSelectedSeats(prev => prev.filter(id => id !== seat.seatId));
        } else {
            setSelectedSeats(prev => [...prev, seat.seatId]);
        }
    };


    if (loading) return <div>좌석 정보를 불러오는 중...</div>;
    if (error || !info) return <div>에러: {error.message || "좌석 정보를 불러올 수 없습니다."}</div>;

    const selectedSeatsInfo = selectedSeats.map(id => {
        const seat = info.seats.find(s => s.seatId === id);
        return seat ? { id: seat.seatId, name: `${String.fromCharCode(65 + seat.row)}${seat.column}` } : null;
    });

    return (
        <div className="reservationContainer">
            <h1 className="screen-name">{info.screenName}</h1>

            <div className="screen-display">SCREEN</div>

            {/* 좌석 배치판 컨테이너 */}
            <div
                className="seat-grid"
                // CSS 변수를 사용하여 동적으로 열 개수 설정
                style={{ '--total-columns': info.totalColumns }}
            >
                {/* info.seats 배열을 순회하며 각 좌석을 버튼으로 렌더링 */}
                {info.seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat.seatId);
                    const isAvailable = seat.status === 'AVAILABLE';

                    // 동적으로 클래스 이름 부여
                    // 예: 'seat available selected'
                    const seatClassName = `
                        seat 
                        ${isAvailable ? 'available' : 'unavailable'} 
                        ${isSelected ? 'selected' : ''}
                    `;

                    return (
                        <button
                            key={seat.seatId}
                            className={seatClassName.trim()}
                            onClick={() => handleSeatClick(seat)}
                            disabled={!isAvailable}
                        >
                            {String.fromCharCode(65 + seat.row)}{seat.column}
                        </button>
                    );
                })}
            </div>
            <ReservationButton
                showingInfoId={showingInfoId}
                selectedSeatsInfo={selectedSeatsInfo}
            />
        </div>
    );
}

export default ReservationPage;