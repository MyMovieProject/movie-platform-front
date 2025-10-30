import apiClient from '../../api/AxiosConfig';
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

function AdminPage () {
    const navigate = useNavigate();

    useEffect(() => {
        const adminPage = async () => {
            try {
                await apiClient.get(`/api/admin`);
            } catch (err) {
                alert(err.response.data);
                console.log(err);
                navigate(`/`);
            }
        };
        adminPage();
    }, [navigate]);

    return (
      <div className="AdminPageContainer">
          <h1>관리자 페이지</h1>
              <div className="admin-buttons">
                  <Link to="/admin/movies" className="admin-button">영화 관리</Link>
                  <Link to="/admin/screens" className="admin-button">상영관 관리</Link>
              </div>
      </div>
    );
}

export default AdminPage;