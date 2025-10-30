import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import apiClient from "../../api/AxiosConfig";

function MovieDetail () {
    const { movieId } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/movies/${movieId}`);
                setDetail(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.response.data);
            } finally {
                setLoading(false)
            }
        };
        fetchMovieDetail();
    }, [movieId]);

    if (loading) {
        return <div>영화를 불러오는 중...</div>;
    }

    if (error) {
        return <div>오류가 발생했습니다.</div>;
    }

    return (
        <div className="DetailContainer">
            <div className="poster-section">
                <img
                    src={detail.posterUrl || 'https://via.placeholder.com/400x600?text=No+Image'}
                    alt={`${detail.title} 포스터`}
                />
            </div>

            <div className="info-section">
                <h1 className="title">{detail.title || '제목 정보 없음'}</h1>
                <h2 className="title-eng">{detail.titleEng || ''}</h2>

                <div className="genres">
                    {detail.genres && detail.genres.length > 0 ? (
                        <span className="genre-list">
                                 장르: {detail.genres.join(', ')}
                        </span>
                    ) : (
                        <p>장르 없음</p>
                    )}
                </div>

                <div className="movie-plot">
                    <h3 className="plot-head">줄거리</h3>
                    <p>{detail.plot || '줄거리 정보가 없습니다.'}</p>
                </div>

                <div>
                    <Link to={`/movies/${movieId}/showings`} className="showingButton">예매</Link>
                </div>

                <div className="info-grid">
                    <p><strong>개봉일:</strong> {detail.releaseDate || '정보 없음'}</p>
                    <p><strong>감독:</strong> {detail.directorNm || '정보 없음'}</p>
                    <p><strong>상영시간:</strong> {detail.runtime ? `${detail.runtime}분` : '정보 없음'}</p>
                    <p><strong>관람등급:</strong> {detail.ratingGrade || '정보 없음'}</p>
                    <p><strong>제작사:</strong> {detail.company || '정보 없음'}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;