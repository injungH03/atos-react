import React from 'react';
import {Footer, HeaderNavi} from '@components';
import { Link } from 'react-router-dom';

const SafetyWorker = () => {

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
											<li className="sub-menu-on menu-item"><Link to="/safety/worker">근로자 정기교육</Link></li>										
											<li className="menu-item"><Link to="/safety/risk">위험성평가 교육</Link></li>									
										</ul>
									</div>
								</div>

                            <div className="sub-contact">
                                <h3 className="border-bt">근로자 정기교육이란?</h3>
                                    <div className="lineTop_tb0"> 
                                        <table className="lineTop_tb">
                                        <tbody>
                                            <tr>
                                                <td>
                                                근로자가 작업을 진행함에 있어 안전.보건에 관한 전문적인 지식을 습득하고 위험요인을 파악하여 산업재해 및 질병을 예방하기 위해,해당 사업장의 근로자를 대상으로 실시하는 교육 입니다.
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
                                    사업장의 일반 근로자
                                    <div className="sun"></div>
                                    
                                    <span>교육시간</span>
                                    사무직 반기별 6시간 이상, 비사무직 반기별 12시간 이상
                                    <div className="sun"></div>

                                    <span>교육내용</span>
                                        <p>1.산업안전및 사고예방의 관한 교육</p>
                                        <p>2.산업보건 및 직업병 예방에 관한 교육</p>
                                        <p>3.위험성평가에 관한 교육</p>
                                        <p>4.건강증진 및 질병 예방에 관한 교육</p>
                                        <p>5.유해.위험 작업환경 관리에 관한 교육</p>
                                        <p>6.산업안전보건법령 및 산업재해보상보험 제도에 관한 교육</p>
                                        <p>7.직무스트레스 예방 및 관리에 관한 교육</p>
                                        <p>8.직장 내 괴롭힘,고객의 폭언 등으로 인한 건강장해 예방 및 관리에 관한 교육</p>
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


export default SafetyWorker;
