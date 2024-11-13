import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthHook } from '@hooks';
import menuItems from './MenuItems';

function Header() {

  const [activeMenu, setActiveMenu] = useState(null);
  const { auth, logout } = AuthHook();
  const navigate = useNavigate();
  const location = useLocation();

  const isMainPage = location.pathname === '/main'; 

  const handleLoginRequiredClick = (e) => {
    e.preventDefault();
    alert('로그인이 필요합니다.');
    navigate('/main');
  };

  const handleMenuMouseEnter = (index) => {
    setActiveMenu(index);
  };

  const handleLogout = async () => {
    try {
        localStorage.removeItem('jwt');
        logout();
        navigate('/main');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header id="header" className={isMainPage ? '' : 'sub-top-img'}>
      <div className={isMainPage ? 'container' : 'container sub-top-sun'}>
        <h1>
          <Link to="/main">
            <img src="/img/logo.png" alt="(주)아토스 안전보건교육" />
          </Link>
        </h1>
        <button type="button" className="btn-menu">
          <span className="hidden">메뉴 보기</span>
        </button>
        <div className="top-content">
          <nav id="gnb">
            <h2 className="hidden">menu</h2>
            <ul className="gnb-list">
              {menuItems.map((item, index) => (
                // 로그인 상태에 따라 '나의강의실' 대메뉴 보이기 조건
                (!item.requiresAuth || auth.isAuthenticated) && (
                  <li
                    key={index}
                    onMouseEnter={() => handleMenuMouseEnter(index)}
                    onMouseLeave={() => setActiveMenu(null)} // 마우스 떠날 때 비활성화
                    className={activeMenu === index ? 'active' : ''}
                  >
                    <Link
                      to={item.subItems[0].link} // title 클릭 시 첫 번째 subItem 링크로 이동
                      className={`gnb-dep-01 ${activeMenu === index ? 'on' : ''}`}
                    >
                      {item.title}
                    </Link>
                    {activeMenu === index && (
                      <div className="gnb-content-wrap">
                        <ul className="gnb-dep-02">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              {subItem.requiresLogin && !auth.isAuthenticated ? (
                                <Link to="#" onClick={(e) => handleLoginRequiredClick(e)}>
                                  {subItem.title}
                                </Link>
                              ) : (
                                <Link to={subItem.link}>
                                  {subItem.title}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                        <div className="gnb-content">
                          <div className="img-thum"></div>
                        </div>
                      </div>
                    )}
                  </li>
                )
              ))}
            </ul>
          </nav>
          <div className="aside-wrap">
            <div className="language-wrap">
            <ul className={auth.isAuthenticated ? 'logged-in' : ''}>
                {!auth.isAuthenticated ? (
                    <>
                        <li><Link to="/main">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
                    </>
                ) : (
                    <>
                        <li><button onClick={handleLogout}>로그아웃</button></li>
                    </>
                )}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
