import axios from 'axios';
import { getCookie } from '../utils/cookie';

const apiClient = axios.create({
    baseURL: '/',
    withCredentials: true
});

let authContextRef = {};

export const setAuthContextRef = (ref) => {
	authContextRef = ref;
}

// 요청 보내기전에 헤더에 엑세스 토큰 추가 및 리프레시 요청일때 헤더에 CSRF 추가
apiClient.interceptors.request.use(
    function (config) {
        const token = authContextRef.getAccessTokenFromMemory();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.url === '/api/auth/refresh') {
            const csrfToken = getCookie('XSRF-TOKEN');
            if (csrfToken) {
                config.headers['X-XSRF-TOKEN'] = csrfToken;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    // 성공 핸들러
    (response) => {
        return response;
    },

    // 실패 핸들러
    async (error) => {
        // 원 요청
        const originalRequest = error.config;

        if (originalRequest.url === '/api/auth/refresh') {
            return Promise.reject(error);
        }

        if (error.response && error.response.status === 401 ) {

            const errorCode = error.response.data.error;

            if (errorCode === 'EXPIRED' || errorCode === 'NOT_EXISTS') {
                try {
                    const refreshResponse = await apiClient.post('/api/auth/refresh');
                    const newAccessToken = refreshResponse.data.accessToken;
                    authContextRef.setAccessToken(newAccessToken);

                    return apiClient(originalRequest);
                } catch (err) {
                    console.error("Refresh failed:", err.response?.data);
                    authContextRef.logout();
                }
            }

            if (errorCode === 'INVALID') {
                console.error("Invalid AccessToken");
                authContextRef.logout();
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;