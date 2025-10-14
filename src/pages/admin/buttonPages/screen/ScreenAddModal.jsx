import React, {useState} from "react";
import './ScreenAddModal.css';
import apiClient from "../../../../api/AxiosConfig";

function ScreenAddModal ({onClose, onScreenAdded}) {

    const [formData, setFormData] = useState({
        name: '',
        rows: '',
        cols: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm("상영관을 추가하시겠습니까?")) {
            return;
        }

        try {
            await apiClient.post(`/api/admin/screens`, formData);
            alert("상영관을 추가했습니다.");
            onScreenAdded();
        } catch (err) {
            alert(err.response.data);
            console.log(err.response.data);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>스크린 추가</h2>
                <form onSubmit={handleSubmit}>
                    <label>상영관 이름</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="상영관 이름을 입력하세요"
                        onChange={handleChange}
                        required
                    />
                    <label>총 좌석 행</label>
                    <input
                        type="number"
                        name="rows"
                        value={formData.rows}
                        placeholder="최대 10행"
                        onChange={handleChange}
                        required
                    />

                    <label>총 좌석 열</label>
                    <input
                        type="number"
                        name="cols"
                        value={formData.cols}
                        placeholder="최대 10열"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">추가</button>
                </form>
                <button onClick={onClose} className="close-button">닫기</button>
            </div>
        </div>
    );

}

export default ScreenAddModal;