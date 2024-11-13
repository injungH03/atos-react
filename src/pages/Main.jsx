import React from 'react';
import {LoginForm, MainVisual, Footer} from '@components';
import { useNavigate, Link } from 'react-router-dom';
import { AuthHook } from '@hooks';
import { get} from '@utils/axios_api';

const Main = () => {
  const { auth, logout } = AuthHook();
  const navigate = useNavigate();


  const goSubmit = () => {
    };


  const handleLogout = async () => {
    try {

        localStorage.removeItem('jwt');
        
        // 클라이언트 측 로그아웃 처리 (React 상태 변경)
        logout();
      
        // 로그아웃 후 로그인 페이지로 리다이렉트
        navigate('/main');
    } catch (error) {
      console.error('Logout failed:', error);
      
    }

  };

  return (
    <main id="main" className="mainpage">
            <>
            <div className="section main-visual">
                <MainVisual />

                <div className="right-content">
                    <div className="catalogue-wrap">
                        <div className="catalogue-content">
                            {!auth.isAuthenticated ? 
                            ( <LoginForm /> ) : 
                                (
                                <>
                                <div className="loginbox mu_member">
                                    <div className="loginForm">
                                        <dl className="inputBox">
                                            <dd>
                                                <div className="fz35 bold">Welcome</div>
                                                <div className="id_input_wrap text-cent">
                                                    <div className="fom-item-cent">
                                                        <img className="mr5" src="/img/vip.png" alt="VIP" />
                                                        <span className="fz16 fw500">{auth.name}</span>
                                                    </div>
                                                    접속일 : {auth.loginTime}
                                                </div>
                                            </dd>
                                        </dl>
                                        <Link to="/" className="btn_login btn_submit btn_color wid  btn-blue"> 나의 강의실</Link>
                                    </div>
                                </div>	
                            </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className="section main-contact">
                <div className="container">
                    <div className="main-BN" style={{ background: '#f3f3f3' }}>
                        <h2>메뉴바로가기</h2>
                        <span>원하시는 곳으로 빠르게 입장 하실 수 있습니다.</span>
                        <div>
                            <ul className="main_banner">
                                <li><Link to="/"><b>수강신청</b>원하시는 맞춤수강<br />신청을 해주세요.</Link></li>
                                <li><Link to="/"><b>나의강의실</b>수강중인 강의실로<br />바로 입장 해주세요.</Link></li>
                                <li><Link to="/"><b>수료증 확인</b>수강하신 수료증을<br />확인 해주세요.</Link></li>
                                <li><Link to="/"><b>Q&A</b>궁금하신 사항은<br />문의 해주세요.</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
   </main>


  );
};


export default Main;
