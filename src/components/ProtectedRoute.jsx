import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@context';

const ProtectedRoute = ({ children, roles }) => {
    const { auth, isLoading  } = useContext(AuthContext);

    if (isLoading) {
        return null; // 로딩 중에는 아무것도 렌더링하지 않음 (또는 로딩 스피너를 표시)
    }

    if (!auth.isAuthenticated) {
        // 인증되지 않은 사용자는 메인 페이지로 리디렉션
        return <Navigate to="/main" replace />;
    }

    if (roles && !roles.includes(auth.role)) {
        // 권한이 없는 사용자는 메인 페이지로 리디렉션
        return <Navigate to="/main" replace />;
    }

    return children;
};

export default ProtectedRoute;
