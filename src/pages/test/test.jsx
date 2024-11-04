import React from 'react';
import {Footer} from '@components';
import { useNavigate } from 'react-router-dom';
import { AuthHook } from '@hooks';
import { get} from '@utils/axios_api';

const test = () => {




  return (
    <main id="main" className="mainpage">
            <>
            <div className="section main-contact">
                <div class="sub-tit-bg">
                    <div class="container sub-h">
                        <div  class="sub-tit-01">
                            <img src="img/ico-home.png" />  교육신청   {'>'}    관리감독자  {'>'}    <span> 집체교육</span>
                        </div>
                    </div>
                </div>
                <div class="sub-container">
                    <div class="sub-layout">
                        <div class="left-menu">
                            <h2>교육신청</h2>
                            <div class="">
                                <ul>
                                    <li class="sub-menu-on">집체교육</li>										
                                    <li>온라인교육</li>										
                                    <li>비대면교육</li>										
                                    <li>단체교육</li>										
                                    <li>혼합교육</li>										
                                </ul>
                            </div>
                        </div>
                        <div class="sub-contact">
                            <h3 class="border-bt">집체교육</h3>
                            <div class="input-box">
                                <div class="input-box-inner">
                                    <div class="fom-inp">
                                        <select class="inp-sel" data-role="dropdownlist">
                                            <option value="null">관리감독자</option>
                                            <option value="A">근로자</option>
                                            <option value="B">위험성평가자</option>
                                        </select>							
                                    </div>
                                    <div class="fom-item">	
                                        <select class="inp-sel" data-role="dropdownlist">
                                            <option value="null">제조업</option>
                                            <option value="A">건설업</option>
                                            <option value="B">서비스업</option>
                                        </select>							
                                    </div>	
                                    <div class="fom-inp">
                                        <input class="inp-sel2"  type="text" id="" name="" placeholder="교육과정명을 검색하세요." />
                                        <button type="button" class="form-icon btn_seach" onclick=""></button>
                                    </div>
                                </div>	
                                <span><button class="btn_reset">초기화</button></span>
                            </div>
									
                            <div>
                                <ui class="sub_banner mb50">
                                    <li>
                                        <span class="no01">집체교육</span>
                                        <b>2024년 2기 관리감독자 교육(제조업) </b>										<dl>
                                            <dt>신청기간</dt><dd>2024-10-07 ~ 2024-10-21</dd>
                                        </dl>
                                        <dl>
                                            <dt>교육일시</dt><dd>2024-11-01  (8h)</dd>
                                        </dl>
                                        <dl>
                                            <dt>정원</dt><dd>50 / 50</dd>
                                        </dl>
                                        <div class="text-cent">
                                            <button class="btn btn_bl mt30">교육마감</button>
                                        </div>
                                    </li>
                                    <li>
                                        <span class="no01">집체교육</span>
                                        <b>2024년 2기 관리감독자 교육(제조업) </b>										<dl>
                                            <dt>신청기간</dt><dd>2024-10-07 ~ 2024-10-21</dd>
                                        </dl>
                                        <dl>
                                            <dt>교육일시</dt><dd>2024-11-01  (8h)</dd>
                                        </dl>
                                        <dl>
                                            <dt>정원</dt><dd>50 / 50</dd>
                                        </dl>
                                        <div class="text-cent">
                                            <button class="btn btn_red mt30" onClick="location.href='education_al01.html'">교육신청</button>
                                        </div>
                                    </li>
                                    <li>
                                        <span class="no01">집체교육</span>
                                        <b>2024년 2기 관리감독자 교육(제조업) </b>										<dl>
                                            <dt>신청기간</dt><dd>2024-10-07 ~ 2024-10-21</dd>
                                        </dl>
                                        <dl>
                                            <dt>교육일시</dt><dd>2024-11-01  (8h)</dd>
                                        </dl>
                                        <dl>
                                            <dt>정원</dt><dd>50 / 50</dd>
                                        </dl>
                                        <div class="text-cent">
                                            <button class="btn btn_red mt30">교육신청</button>
                                        </div>
                                    </li>
                                    
                                </ui>
                                <ui class="sub_banner mb50">
                                    <li>
                                        <span class="no01">집체교육</span>
                                        <b>2024년 2기 관리감독자 교육(제조업) </b>										<dl>
                                            <dt>신청기간</dt><dd>2024-10-07 ~ 2024-10-21</dd>
                                        </dl>
                                        <dl>
                                            <dt>교육일시</dt><dd>2024-11-01  (8h)</dd>
                                        </dl>
                                        <dl>
                                            <dt>정원</dt><dd>50 / 50</dd>
                                        </dl>
                                        <div class="text-cent">
                                            <button class="btn btn_bl mt30">교육마감</button>
                                        </div>
                                    </li>
                                    <li>
                                        <span class="no01">집체교육</span>
                                        <b>2024년 2기 관리감독자 교육(제조업) </b>										<dl>
                                            <dt>신청기간</dt><dd>2024-10-07 ~ 2024-10-21</dd>
                                        </dl>
                                        <dl>
                                            <dt>교육일시</dt><dd>2024-11-01  (8h)</dd>
                                        </dl>
                                        <dl>
                                            <dt>정원</dt><dd>50 / 50</dd>
                                        </dl>
                                        <div class="text-cent">
                                            <button class="btn btn_red mt30">교육신청</button>
                                        </div>
                                    </li>
                                    <li>
                                        <span class="no01">집체교육</span>
                                        <b>2024년 2기 관리감독자 교육(제조업) </b>										<dl>
                                            <dt>신청기간</dt><dd>2024-10-07 ~ 2024-10-21</dd>
                                        </dl>
                                        <dl>
                                            <dt>교육일시</dt><dd>2024-11-01  (8h)</dd>
                                        </dl>
                                        <dl>
                                            <dt>정원</dt><dd>50 / 50</dd>
                                        </dl>
                                        <div class="text-cent">
                                            <button class="btn btn_red mt30">교육신청</button>
                                        </div>
                                    </li>
                                    
                                </ui>
                            </div>
                        </div>	
                    </div>	
                </div>
                <Footer />
            </div>
        </>
   </main>


  );
};


export default test;
