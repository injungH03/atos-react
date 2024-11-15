import React, { useContext } from 'react';
import { HeaderContext } from '@context/HeaderContext';

const HeaderNavi = ({selectedCategory}) => {
    const { headerMenu, subMenu } = useContext(HeaderContext);

    const categoryToDisplay = headerMenu === '교육신청' ? selectedCategory || '전체' : '';

    return (
        <div className="sub-tit-bg">
          <div className="container sub-h">
            <div className="sub-tit-01">
              <img src="/img/ico-home.png" alt="home" />
    
              {headerMenu && <>{headerMenu}</>}
    
              {headerMenu && subMenu && <> {'|'} {subMenu}</>}
    
              {categoryToDisplay && (
                <> {'|'} &nbsp;<span>{categoryToDisplay}</span> </>
              )}
            </div>
          </div>
        </div>
      );
    };

export default HeaderNavi;
