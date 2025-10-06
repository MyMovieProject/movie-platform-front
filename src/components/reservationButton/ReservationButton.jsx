import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ReservationButton({showingInfoId, selectedSeatsInfo}) {

    const navigate = useNavigate();

    const handleReservation = async () => {
        if (selectedSeatsInfo.length === 0) {
            alert("좌석을 선택해주세요");
            return ;
        }

        const selectedSeatIds = selectedSeatsInfo.map(seat => seat.id);

        try {
            const response = await axios.post('/api/reservations', {
                showingInfoId: showingInfoId,
                seatIds: selectedSeatIds,
            });
            alert("예매 성공했습니다");
            const reservationId = response.data.reservationId;
            navigate(`/mypage/reservations/${reservationId}`);
        } catch (err) {
            alert("예매 실패했습니다.");
        }
    }

    return (
        <div className="info-section">
            <h3>선택한 좌석: {selectedSeatsInfo.length}개</h3>
            <p>
                {selectedSeatsInfo.map(seat => seat.name).join(', ')}
            </p>
            <button
                className="reserve-button"
                onClick={handleReservation}
                disabled={selectedSeatsInfo.length === 0}
            >
                예매하기
            </button>
        </div>
    );
}

export default ReservationButton;