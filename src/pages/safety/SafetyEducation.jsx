import React from 'react';
import {Footer, HeaderNavi} from '@components';
import { Link } from 'react-router-dom';

const SafetyEducation = () => {

  return (
    <main id="main" className="mainpage">
            <>
            <div>
                <div className="section main-contact">

                    <HeaderNavi  selectedCategory  />
                
                    <div className="sub-container">
                        <div className="sub-layout">
                            <div className="left-menu">
									<h2>안전보건교육소개</h2>
									<div className="">
										<ul>
											<li className="sub-menu-on menu-item"><Link to="/safety">안전보건교육</Link></li>										
											<li className="menu-item"><Link to="/safety/management">관리감독자 정기교육</Link> </li>										
											<li className="menu-item"><Link to="/safety/worker">근로자 정기교육</Link></li>										
											<li className="menu-item"><Link to="/safety/risk">위험성평가 교육</Link></li>									
										</ul>
									</div>
								</div>

                            <div className="sub-contact">
                                <h3 className="border-bt">안전보건교육이란?</h3>
                                    <div className="lineTop_tb0"> 
                                    <table className="lineTop_tb">
                                    <tbody>
                                        <tr>
                                            <td>
                                            <span className="point-blue">안전보건교육은 중대재해처벌법 시행(24.1.27)</span>
                                            으로 안전보건관리체계 구축, 이행에 어려움을 겪는 중소기업(5인~299인)을 대상으로 기업이
                                            스스로 위험요인을 발굴하고 개선할 수 있는 안전역량을 향상토록 하여 재해를 예방하고, 자기 규율 예방체계 구축 확산에 기여 할 수 있는 교육
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    </div>
                                <div className="view-txt">  
                                    <span>근거법령</span>
                                    산업안전보건법 제16조(관리감독자),산업안전보건법 제29조(안전보건교육)
                                </div>     
                                
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


export default SafetyEducation;
