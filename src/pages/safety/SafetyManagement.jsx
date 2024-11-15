import React from 'react';
import {Footer, HeaderNavi} from '@components';
import { Link } from 'react-router-dom';

const SafetyManagement = () => {

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
											<li className="menu-item"><Link to="/safety">안전보건교육</Link></li>										
											<li className="sub-menu-on menu-item"><Link to="/safety/management">관리감독자 정기교육</Link> </li>										
											<li className="menu-item"><Link to="/safety/worker">근로자 정기교육</Link></li>										
											<li className="menu-item"><Link to="/safety/risk">위험성평가 교육</Link></li>									
										</ul>
									</div>
								</div>

                            <div className="sub-contact">
                                <h3 className="border-bt">관리감독자 정기교육이란?</h3>
                                    <div className="lineTop_tb0"> 
                                    <table className="lineTop_tb">
                                    <tbody>
                                        <tr>
                                            <td>
                                            <span className="point-blue">산업안전보건법 제16조</span>
                                            에 따라  경영조직에서 생산과 관련되는 당해업무와 소속직원을 직접 지휘 감독하는 부서의 장이나 그 직위를 담당하는 자
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    </div>
                                <div className="view-txt">  
                                    <span>근거법령</span>
                                    산업안전보건법 제16조(관리감독자),산업안전보건법 제29조(안전보건교육)
                                    <div className="sun"></div>
                                    <span>교육대상직종</span>
                                    제조,건설,서비스업의 관리감독자 지위에 있는 사람
                                    <div className="sun"></div>
                                    
                                    <span>교육시간</span>
                                    반기 별 8시간 (연간 16시간)
                                    <div className="sun"></div>

                                    <span>교육내용</span>
                                    <p>1.산업안전보건법의 목적과 특징,법령에 대해 이해하고, 산업안전보건법의 필요성에 대해 파악하는 교육</p>
                                        <p> 2.관리감독자의 역할과 임무에 관한 교육</p>
                                        <p> 3.감전재해에 대해 이해하고 감전재해를 예방에 관한 교육</p>
                                        <p>4.정리정돈에대해  이해하고 정리정돈의 조직화에 관한 교육</p>
                                        <p> 5.산업보건에 대해 이해하고 직업병을 예방에 관한 교육</p>
                                    <p>  6.유해화학물질을 안전하게 사용.관리에 관한 교육</p>
                                        <p> 7.근골격계질환에 대해 이해하고 유해요인 조사에 관한 교육</p>
                                        <p>8.MSDS와 GHS를 이해하고 설명에 관한 교육</p>
                                        <p>9.제조업,건설업,서비스업 근로자의 안전보건에 관한 교육</p>
                                        <p>10.심폐소생술 실시 및 제세동기의 사용법에 관한 교육</p>

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


export default SafetyManagement;
