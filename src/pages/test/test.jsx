import React from 'react';
import {Footer, HeaderNavi} from '@components';



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
