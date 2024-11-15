import React from 'react';
import {Footer, HeaderNavi} from '@components';
import { Link } from 'react-router-dom';

const SafetyRisk = () => {

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
											<li className="menu-item"><Link to="/safety/management">관리감독자 정기교육</Link> </li>										
											<li className="menu-item"><Link to="/safety/worker">근로자 정기교육</Link></li>										
											<li className="sub-menu-on menu-item"><Link to="/safety/risk">위험성평가 교육</Link></li>									
										</ul>
									</div>
								</div>

                            <div className="sub-contact">
                                <h3 className="border-bt">위험성평가교육이란?</h3>
                                    <div className="lineTop_tb0"> 
                                        <table className="lineTop_tb">
                                        <tbody>
                                            <tr>
                                                <td>
                                                사업주가 스스로 유해.위험요인을 파악하고 유해.위험요인의 위험성 수준을 결정하여,위험성을 낮추기 위한 적절한 조치를 마련하고 실해하는 과정을 말합니다.
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    <div className="view-txt">  
                                        <span>근거법령</span>
                                        산업안전보건법 제36조, 산업안전보건법 시행규칙 제37조
                                        <div className="sun"></div>
                                        <span>교육대상직종</span>
                                        전 업종 사업주 위험성 평가 담당자
                                        <div className="sun"></div>
                                        
                                        <span>교육시간</span>
                                        사업주 교육 2시간, 평가담당자교육 제조업,건설업 16시간, 서비스업 8시간
                                        <div className="sun"></div>

                                        <span>교육내용</span>
                                            <p>1.위험성평가 기법의 작용에 관한 교육</p>
                                            <p>2.해당 업종별 사업장에 대한 안전교육 및 위험성 평가에 관한 교육</p>
                                            <p>3.정리정돈에대해  이해하고 정리정돈의 조직화에 관한 교육</p>
                                            <p>4.산업보건에 대해 이해하고 직업병을 예방에 관한 교육</p>
                                            <p>5.유해화학물질을 안전하게 사용.관리에 관한 교육</p>
                                            <p>6.근골격계질환에 대해 이해하고 유해요인 조사에 관한 교육</p>
                                            <p>7.MSDS와 GHS를 이해하고 설명에 관한 교육</p>
                                            <p>8.제조업,건설업,서비스업 근로자의 안전보건에 관한 교육</p>
                                            <p>9.심폐소생술 실시 및 제세동기의 사용법에 관한 교육</p>
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


export default SafetyRisk;
