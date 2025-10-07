import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AdminScreen () {
    const [screens, setScreens] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchScreens = async () => {
            try {
                const response = await axios.get(`/api/admin/screens`);
                console.log(response.data);
                setScreens(response.data.content);
            } catch (err) {
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        }
        fetchScreens();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className="AdminScreenContainer">
            <h1>상영관 관리</h1>
            <table className="screens">
                <thead>
                <tr>
                    <td>아이디</td>
                    <td>이름</td>
                    <td>상세</td>
                </tr>
                </thead>
                <tbody>
                {screens.map(screen => (
                    <tr key={screen.id}>
                        <td>{screen.id}</td>
                        <td>{screen.name}</td>
                        <td>
                            <Link to={`/admin/screens/${screen.id}`}>상영정보</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default AdminScreen;