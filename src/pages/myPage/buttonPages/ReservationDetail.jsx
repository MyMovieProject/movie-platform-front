import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

function ReservationDetail() {
    const { reservationId } = useParams();
    const [detail, setReservationDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservationDetail = async () => {
            try {
                const response = await axios.get(`/api/reservations/${reservationId}`);
                setReservationDetail(response.data);
                console.log(response.data);
            } catch (error) {
                setError(error.response.data.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchReservationDetail();
    }, [reservationId]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
      <div className="reservationDetail-container">
          <h1>예매 상세정보</h1>
          <table className="detail-table">
              <thead>
              <tr>
                  <th>예매 영화</th>
                  <th>포스터</th>
                  <th>예약일</th>
                  <th>상영관</th>
                  <th>예약 좌석</th>
                  <th>상영일</th>
                  <th>시작 시간</th>
                  <th>끝나는 시간</th>
                  <th>예매 가격</th>
                  <th>예매 상태</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>{detail.movieTitle}</td>
                  <td><img src={detail.posterUrl} alt={detail.movieTitle} width="80" /></td>
                  <td>{detail.reservationDate}</td>
                  <td>{detail.screenName}</td>
                  <td>{detail.seatNames}</td>
                  <td>{detail.showingDate}</td>
                  <td>{detail.startTime}</td>
                  <td>{detail.endTime}</td>
                  <td>{detail.finalPrice.toLocaleString()}원</td>
                  <td>{detail.reservationStatus}</td>
              </tr>
              </tbody>
          </table>
      </div>
    );

}

export default ReservationDetail;