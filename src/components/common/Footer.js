import React from 'react';
// import { useNavigate, Link } from 'react-router-dom'

function Footer() {
    // const navigate = useNavigate();    

  return (
    <footer id="footer">
    <div className="container">
        <div className="footer-logo">
            <img src="/img/logo_footer.png" alt="(주)아토스 안전보건교육" />
        </div>
        <ul className="menu-list">
            <li><a href="#">고객센터</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="#">개인정보처리방침</a></li>
        </ul>
        <div className="footer-bottom">
            <address>
                <span>[08500] 서울특별시 금천구 가산디지털2로 173, 1008_1009호 (가산동, 에이스 비즈포레 지식산업센터) TEL : 02-3442-7111 FAX : 02-3442-2110</span>
                <span>사업자 등록번호 : 123-45-6789</span>
                <span>대표자 : 이태식</span>
            </address>
            <p className="copy">Copyright &copy; 2024 ATOS. ALL RIGHTS RESERVED.</p>
        </div>
    </div>
    </footer>
  );
}

export default Footer;