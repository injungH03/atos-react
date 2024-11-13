import React from 'react';
import {Footer, HeaderNavi} from '@components';

/** 
 * URL 파라미터: 보안에 민감하지 않은 데이터 전달 시, RESTful 경로로 사용.
예: /products/:productId, /categories/:categoryId
쿼리 문자열: 선택적 필터나 정렬과 같은 데이터를 추가할 때.
예: /search?query=react, /products?sort=price_asc
상태(State): URL에 민감한 데이터가 노출되지 않도록 할 때.
예: 로그인 사용자 정보, 결제 관련 정보, 세션 관련 데이터 등
 * 
*/


const test = () => {

  return (
    <main id="main" className="mainpage">
            <>
            <div>
                <div className="section main-contact">

                    <HeaderNavi  selectedCategory  />
                
                    <div className="sub-container">
                        <div className="sub-layout">
                            {/* <LeftMenu /> 이곳에 필요한 경우 서브 메뉴 추가 */ }

                            <div className="sub-contact">
                                <h3 className="border-bt">{/*이곳에 서브 메뉴 이름 */}</h3>

                                {/*이곳에 컨텐츠 영역 */}
                                        
                                
                            </div>	
                        </div>	
                    </div>
                    <Footer />
                </div>
            </div>
        </>
   </main>


  );
};


export default test;
