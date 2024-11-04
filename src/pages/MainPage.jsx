import React, { useContext } from 'react';
import {LoginForm} from '@components';
import { useNavigate } from 'react-router-dom';
import { AuthContext  } from '@context';
import { get} from '@utils/axios_api';
const MainPage = () => {
  const { auth, logout } = useContext(AuthContext );
  const navigate = useNavigate();

  const bootUrl = process.env.REACT_APP_BOOT_URL;
  const reactUrl = process.env.REACT_APP_REACT_URL;

  const redirectToSpringBoot = () => {
    get(`${bootUrl}/admin/member/boardList`, {
    });
    window.location.href = `${bootUrl}/admin/member/boardList`;
  };

  const handleLogout = async () => {
    try {

        localStorage.removeItem('jwt');
        
        // 클라이언트 측 로그아웃 처리 (React 상태 변경)
        logout();
      
        // 로그아웃 후 로그인 페이지로 리다이렉트
        //   navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };

  return (
      <div style={styles.container}>
          <h1>React Main Page</h1>
          <p>여기가 React 메인 페이지입니다.</p>

          {/* 로그인 상태에 따라 다른 UI 표시 */}
          {/* {!auth.isAuthenticated ? (
              <LoginForm />
          ) : (
              <div style={styles.userInfo}>
                  <h2>환영합니다!</h2>
                  <p>현재 로그인한 역할: {auth.role}</p>
                  <button onClick={handleLogout} style={styles.logoutButton}>
                      로그아웃
                  </button>
              </div>
          )} */}

          {/* Spring Boot JSP 페이지로 이동 버튼 */}
          <button onClick={redirectToSpringBoot} style={styles.button}>
              Spring Boot JSP 페이지로 이동
          </button>

          {/* 회원가입 버튼 */}
          {!auth.isAuthenticated && (
              <button onClick={() => navigate('/signup')} style={styles.button}>
                  회원가입
              </button>
          )}

          <p>React URL: {reactUrl}</p>
      </div>
  );
};

const styles = {
  container: {
      padding: '20px',
      textAlign: 'center',
  },
  button: {
      padding: '10px 20px',
      margin: '10px',
      backgroundColor: '#008CBA',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
  },
  logoutButton: {
      padding: '10px 20px',
      marginTop: '10px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
  },
  userInfo: {
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      display: 'inline-block',
  },
};

export default MainPage;
