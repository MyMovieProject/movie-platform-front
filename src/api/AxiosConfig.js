import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/',
    withCredentials: true
});

let authContextRef = {};

export const setAuthContextRef = (ref) => {
	authContextRef = ref;
}

// 요청 보내기전에 헤더에 엑세스 토큰 추가
apiClient.interceptors.request.use(
    function (config) {
        const token = authContextRef.getAccessTokenFromMemory();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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

        if(error.response.status === 401 && originalRequest.url !== '/api/auth/refresh') {
            try {
                const refreshResponse = await apiClient.post('/api/auth/refresh');
                const newAccessToken = refreshResponse.data.accessToken;

                authContextRef.setAccessToken(newAccessToken);

                return apiClient(originalRequest);
            } catch (err) {
                authContextRef.logout();
                return Promise.reject(err);
            }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return Promise.reject(error);
    }
);

export default apiClient;