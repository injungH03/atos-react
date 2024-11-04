import React, { useContext } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { HeaderContext } from '@context/HeaderContext';

const LeftMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentMenu = searchParams.get('lectureMethod') || '집체교육';
    const { setSubMenu } = useContext(HeaderContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (menuName) => {

        const params = new URLSearchParams(searchParams);
        params.set('lectureMethod', menuName);
        params.set('pageIndex', '1');

        setSearchParams(params);
        setSubMenu(menuName);

        if (location.pathname !== '/lecture') {
            navigate(`/lecture?${params.toString()}`);
        }
    };


    return (
        <div className="left-menu">
            <h2>교육신청</h2>
            <div>
                <ul>
                    <li 
                        className={currentMenu === '집체교육' ? 'sub-menu-on' : ''} 
                        onClick={() => handleMenuClick('집체교육')}
                    >
                        집체교육
                    </li>
                    <li 
                        className={currentMenu === '온라인교육' ? 'sub-menu-on' : ''} 
                        onClick={() => handleMenuClick('온라인교육')}
                    >
                        온라인교육
                    </li>
                    <li 
                        className={currentMenu === '비대면교육' ? 'sub-menu-on' : ''} 
                        onClick={() => handleMenuClick('비대면교육')}
                    >
                        비대면교육
                    </li>
                    <li 
                        className={currentMenu === '단체교육' ? 'sub-menu-on' : ''} 
                        onClick={() => handleMenuClick('단체교육')}
                    >
                        단체교육
                    </li>
                    <li 
                        className={currentMenu === '혼합교육' ? 'sub-menu-on' : ''} 
                        onClick={() => handleMenuClick('혼합교육')}
                    >
                        혼합교육
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LeftMenu;
