import React, { useEffect, useContext } from 'react';
import {Footer, HeaderNavi, LeftMenu, ScrollTop, SearchBox, Pagination} from '@components';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { useQuery } from 'react-query';
import { get} from '@utils/axios_api';
import { HeaderContext } from '@context/HeaderContext';

const categoryLabels = {
    A001: '관리감독자',
    A002: '근로자',
    A003: '위험성평가자',
  };

const LectureDetail = () => {
    const [searchParams] = useSearchParams();
    const { setSubMenu } = useContext(HeaderContext);

    const mainCode = searchParams.get('mainCode');
    const selectedCategory = categoryLabels[mainCode];

    useEffect(() => {
        const lectureMethod = searchParams.get('lectureMethod') || '전체';
        setSubMenu(lectureMethod);
    }, [searchParams, setSubMenu]);

  return (
    <>
    <ScrollTop />
    <main id="main" className="mainpage">
            <div>
                <div className="section main-contact">

                    <HeaderNavi selectedCategory={selectedCategory} />
                    
                    <div className="sub-container">
                        <div className="sub-layout">
                            <LeftMenu />

                            <div className="sub-contact">
                            <div className="tit-T">교육정보 2024년 N기 관리감독자 교육(서비스업) 모집중 (D-2)</div>
										<div className="lineTop_tb01"> 
											<table  className="lineTop_tb">
												<thead>
													<tr>
														<th>교육신청기간</th>
														<th>교육일자</th>
														<th>교육시간</th>
														<th>정원수</th>
														<th>강사</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>2024-00-00 ~ 2024-00-00</td>
														<td>2024-00-00</td>
														<td>09:00 ~ 18:00 (8h)</td>
														<td>00/50</td>
														<td>이준석</td>
													</tr>
												</tbody>
											</table>
										</div>
									
									<div className="view-txt">
										<span>교육대상</span>
										서비스업의 관리감독자 지위에 있는 사람	
										<span>관련법령</span>
										산업안전보건법 제16조(관리감독자),산업안전보건법 제29조(안전보건교육)
										<span>교육내용</span>
										<p>•  산업안전보건법의 이해</p>
										<p>• 관리감독자의 역할 및 위험성평가</p>
										<p>• 감정재해예방대책</p>
										<p>• 정리정돈 및 청소</p>
										<p>• 산업보건과 직업병예방</p>
										<p>• 물질안전보건자료(MSDS)</p>
										<p>• VR로 보는 안전보건</p>
										<p>• 심폐소생술</p>
										<span>수료조건</span>
										출석(100%)<br />
										<b className="txt-red small-font">* 정해진 교육시간을 모두 이수했을 경우에만 수료 할 수 있습니다.</b>
										<span>교육시간표</span>
										관리감독자교육 (서비스업) 교육시간표
										<span>교육장소</span>
										서울틀별시 구로구 디지털로 273 에이스 트윈타워 905호<br />
										<div id="daumRoughmapContainer1729131615404" className="root_daum_roughmap root_daum_roughmap_landing"></div>

										<span>폐강기준</span>
										교육생 인원이 10명 미만일 경우 자동으로 페강 처리 되며 교육일자 변경 또는 환불 됩니다
										<div className="box-border">
											<span className="txt-red">유의사항</span>
											<b className="txt-point-img"><img src="/img/btn_point.png" />교육 일정변경</b> 수강생 개인 사정으로 인한 교육 일정 변경은 <b className="txt-blue">1회</b> 가능합니다<br/>
											<b className="txt-point-img"><img src="/img/btn_point.png" />환불조건</b> 신청 마감일까지 교육비 <b className="txt-blue">미결제 상태인 경우 신청</b> 취소 처리되며 <b class="txt-blue">신청 마감일 이후로부터~교육 당일 출석확인 전까지는 교육비
											환불 불가,교육일정</b> 변경만 1회 가능합니다.
										</div>
										<div className="text-cent">
													<button className="btn btn_red mt30">교육신청</button>
													<button className="btn btn-blue mt30">목록으로</button>
										</div>
									</div>
                            </div>	
                        </div>	
                    </div>
                    <Footer />
                </div>
            </div>
   </main>
   </>

  );
};


export default LectureDetail;
