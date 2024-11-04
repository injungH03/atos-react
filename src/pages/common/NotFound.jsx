import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/main'); 

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>요청한 페이지를 찾을 수 없습니다.</h1>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <div style={{ marginTop: '30px' }}>
        <button onClick={goBack} style={{ marginRight: '10px' }}>
          이전 페이지로 돌아가기
        </button>
        <button onClick={goHome}>
          홈으로 가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;
