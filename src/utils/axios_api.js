import axios from 'axios';

// 로그아웃 콜백 함수를 저장할 변수
let logoutCallback = () => {};

// 로그아웃 콜백 함수를 설정하는 함수
export const setLogoutCallback = (callback) => {
    logoutCallback = callback;
};

const BASE_URL = process.env.REACT_APP_BOOT_URL || 'http://localhost:8080';

const axios_api = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// 요청 인터셉터: Authorization 헤더에 토큰 추가
axios_api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 로그아웃 및 리디렉션 처리
axios_api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (process.env.NODE_ENV === 'development') {
                console.error('API 에러 발생:', data);
            }

            if (process.env.NODE_ENV === 'production') {
                if (data && data.message) {
                    error.message = data.message;
                }

                switch (status) {
                    case 400:
                        error.message = '잘못된 요청입니다.';
                        break;
                    case 403:
                        error.message = '접근이 거부되었습니다.';
                        break;
                    case 404:
                        error.message = '요청한 페이지를 찾을 수 없습니다.';
                        break;
                    case 500:
                        error.message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
                        break;
                    default:
                        error.message = '알 수 없는 오류가 발생했습니다.';
                }
            }

            if (status === 401) {
                logoutCallback(); // 로그아웃 콜백 호출
                alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                window.location.href = '/main'; // 로그인 페이지로 리디렉션
            } else {
                alert(error.message);
            }
        } else if (error.request) {
            // 서버가 응답하지 않았을 때
            console.error('응답을 받지 못했습니다:', error.request);
            alert('서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.');
        } else {
            // 요청 설정 중 에러가 발생했을 때
            console.error('에러 발생:', error.message);
            alert('알 수 없는 오류가 발생했습니다.');
        }

        return Promise.reject(error);
    }
);

// GET 요청 함수
export const get = async (url, config = {}) => {
    try {
        const response = await axios_api.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// POST 요청 함수
export const post = async (url, data, config = {}) => {
    try {
        const response = await axios_api.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PUT 요청 함수
export const put = async (url, data, config = {}) => {
    try {
        const response = await axios_api.put(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// DELETE 요청 함수
export const del = async (url, config = {}) => {
    try {
        const response = await axios_api.delete(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default axios_api;
