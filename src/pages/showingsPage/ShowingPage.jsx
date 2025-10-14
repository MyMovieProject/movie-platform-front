import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import apiClient from "../../api/AxiosConfig";

function ShowingPage () {
    const { movieId } = useParams();
    const [showings, setShowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieShowing = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/showings/${movieId}`);
                setShowings(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.response.data);
            } finally {
                setLoading(false)
            }
        };
        fetchMovieShowing();
    }, [movieId]);

    if (loading) {
        return <div>상영정보를 불러오는 중입니다.</div>;
    }

    if (error) {
        return (
            // mypage.css에서 걸리는 이유
            <div className="error-message">
                <p>{error}</p>
            </div>)
    }

    const groupedShowings = showings.reduce((group, showing) => {
        const date = showing.showingDate;
        if (!group[date]) {
            group[date] = [];
        }
        group[date].push(showing);
        return group;
    }, {});

    return (
        <div className="ShowingContainer">
            <h1>상영정보</h1>

            {showings.length === 0 ? (
                <p>해당 영화에 대한 상영계획이 없습니다.</p>
            ) : (
                <>
                <h2 className="movieName">제목 : {showings[0].movieName}</h2>
                    {Object.entries(groupedShowings).map(([date, showingsOnDate]) => (
                    <div key={date} className="date-group">
                        <h3 className="date">상영일 : {date}</h3>
                        <div className="time-container">
                            {showingsOnDate.map((showing) => (
                                <div key={showing.id} className="time-slot">
                                    <p className="start-time">시작시간 : {showing.startTime.substring(0, 5)}</p>
                                    <p className="end-time">종료시간 : {showing.endTime.substring(0,5)}</p>
                                    <p className="screen-name">상영관 : {showing.screenName}</p>
                                    <p className="price">가격 : {showing.price.toLocaleString()}원</p>
                                    <p className="total-seat">남은 좌석 : {showing.availableSeatCount} 좌석</p>
                                    <Link to={`/movies/${movieId}/showings/${showing.id}/reservations`} className="reservation-button">예매</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </>
            )}
        </div>
    )

}

export default ShowingPage;