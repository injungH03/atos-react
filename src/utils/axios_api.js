import axios from 'axios';
import { toast } from 'react-toastify';

// 로그아웃 콜백 함수를 저장할 변수
let logoutCallback = () => {};

// 로그아웃 콜백 함수를 설정하는 함수
export const setLogoutCallback = (callback) => {
    logoutCallback = callback;
};

// 전역 플래그 추가
let isSessionExpired = false;

// 세션 만료 플래그를 리셋하는 함수
export const resetSessionExpired = () => {
    isSessionExpired = false;
};

const BASE_URL = process.env.REACT_APP_BOOT_URL || 'http://localhost:8080';

const axios_api = axios.create({
    baseURL: `${BASE_URL}/api`,
    withCredentials: true,
    timeout: 3000,
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

const LOGIN_URL = '/login';

// 응답 인터셉터: 401 에러 발생 시 로그아웃 및 리디렉션 처리
axios_api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data, config } = error.response;

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

            const isLoginEndpoint = config.url === LOGIN_URL;

            if (status === 401) {
                if (isLoginEndpoint) {
                    const errorCode = data.errorCode;
                    const errorMessage = data.error || '아이디나 비밀번호가 다릅니다.';

                    console.log(errorMessage, errorCode);

                    switch (errorCode) {
                        case 'BAD_CREDENTIALS':
                            toast.error(errorMessage); // "아이디 또는 비밀번호가 다릅니다."
                            break;
                        case 'ACCOUNT_PENDING':
                            toast.error(errorMessage); // "승인 대기 상태입니다. 관리자의 승인을 기다려주세요."
                            break;
                        case 'ACCOUNT_DORMANT':
                            toast.error(errorMessage); // "휴면 계정입니다. 본인인증을 진행해주세요."
                            window.location.href = '/identity-verification'; // 실제 본인인증 페이지 경로로 변경
                            break;
                        case 'ACCOUNT_SUSPENDED':
                            toast.error(errorMessage); // "정지된 계정입니다."
                            break;
                        case 'ACCOUNT_DELETED':
                            toast.error(errorMessage); // "사용 불가능한 계정 입니다."
                            break;
                        case 'ACCOUNT_DISABLED':
                            toast.error(errorMessage); // "계정이 비활성화 상태입니다."
                            break;
                        case 'ACCOUNT_STATUS_MISSING':
                            toast.error('사용자 상태 정보가 누락되었습니다. 관리자에게 문의해주세요.');
                            break;
                        default:
                            toast.error(errorMessage);
                    }
                } else {
                    if (!isSessionExpired) { // 플래그 체크
                        isSessionExpired = true; // 플래그 설정
                        logoutCallback(); // 로그아웃 콜백 호출
                        toast('세션이 만료되었습니다. 다시 로그인해 주세요.');
                    }
                }
            }
        } else if (error.request) {
            console.error('응답을 받지 못했습니다:', error.request);
            toast.error('서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
        } else {
            console.error('에러 발생:', error.message);
            toast.error('알 수 없는 오류가 발생했습니다.');
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
