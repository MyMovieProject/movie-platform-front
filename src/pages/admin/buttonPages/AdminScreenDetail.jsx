import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function AdminScreenDetail () {
    const { screenId } = useParams();
    const [screenName, setScreenName] = useState('');
    const [showingInfos, setShowingInfos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchScreenDetail = async () => {
            try {
                const response = await axios.get(`/api/admin/screens/${screenId}`);
                setShowingInfos(response.data.content);
                setScreenName(response.data.content[0].screenName);
                console.log(response.data.content);
            } catch (err) {
                setError(err.response.data);
                console.log(err.response);
            } finally {
                setLoading(false);
            }
        }
        fetchScreenDetail();
    }, [screenId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className="AdminScreenDetailContainer">
            <h1>{screenName} 상영정보</h1>
            <table className="showingInfo">
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>영화 이름</th>
                    <th>상영 날짜</th>
                    <th>시작 시간</th>
                    <th>종료 시간</th>
                    <th>가격</th>
                    <th>전체 좌석</th>
                    <th>예매된 좌석</th>
                    <th>남은 좌석</th>
                </tr>
                </thead>
                <tbody>
                {showingInfos.map(showingInfo => (
                    <tr key={showingInfo.id}>
                        <td>{showingInfo.id}</td>
                        <td>{showingInfo.movieName}</td>
                        <td>{showingInfo.showingDate}</td>
                        <td>{showingInfo.startTime.substring(0,5)}</td>
                        <td>{showingInfo.endTime.substring(0,5)}</td>
                        <td>{showingInfo.price}</td>
                        <td>{showingInfo.totalSeatCount}</td>
                        <td>{showingInfo.bookSeatCount}</td>
                        <td>{showingInfo.availableSeatCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminScreenDetail;