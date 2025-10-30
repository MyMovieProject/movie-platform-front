import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import MovieSelectModal from "./MovieSelectModal";
import apiClient from "../../../../../api/AxiosConfig";

function ShowingAdd () {
    const { screenId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const screenName = location.state?.screenName || '상영관';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovieName, setSelectedMovieName] = useState('');

    const [formData, setFormData] = useState({
        screenId: screenId,
        movieId: '',
        showingDate: '',
        startTime: '',
        price: '0'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/api/admin/showings', formData);
            alert('상영 일정이 성공적으로 추가되었습니다.');
            navigate(`/admin/screens/${screenId}`);
        } catch (error) {
            console.error("일정 추가 실패:", error);
            const errorMessage = error.response.data || "오류가 발생했습니다. 다시 시도해주세요.";
            alert(errorMessage);
        }
    }

    const handleSelectMovie = (movie) => {
        setFormData(prev => ({ ...prev, movieId: movie.id}));
        setSelectedMovieName(movie.title);
        setIsModalOpen(false);
    }

    return (
        <div>
            <h1>{screenName} - 상영일정 추가</h1>
            <form onSubmit={handleSubmit}>
                <label>영화선택</label>
                <div>
                    <span>{selectedMovieName || '영화를 선택해주세요.'}</span>
                    <button type="button" onClick={() => setIsModalOpen(true)}>영화 선택</button>
                </div>

                <label>상영일</label>
                <input
                    type="date"
                    name="showingDate"
                    value={formData.showingDate}
                    onChange={handleChange}
                    required
                />

                <label>시작 시간</label>
                <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                />

                <label>가격</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                />
                <button type="submit">일정 추가하기</button>
            </form>

            <button>
                <Link to={`/admin/screens/${screenId}`}>이전</Link>
            </button>

            {isModalOpen && (
                <MovieSelectModal
                    onClose={() => setIsModalOpen(false)}
                    onSelectMovie={handleSelectMovie}
                />
            )}

        </div>
    );
}

export default ShowingAdd;