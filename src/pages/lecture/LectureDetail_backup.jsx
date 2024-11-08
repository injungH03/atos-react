import React, { useEffect, useContext, useState } from 'react';
import { Footer, HeaderNavi, LeftMenu, ScrollTop, KakaoMap, FileList } from '@components';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { get, post } from '@utils/axios_api';
import { AuthHook } from '@hooks';
import { HeaderContext } from '@context/HeaderContext';
import { Globals } from '@utils/constants';

const categoryLabels = {
    A001: '관리감독자',
    A002: '근로자',
    A003: '위험성평가자',
};

const fetchLectureDetail = async (lectureCode) => {
    const response = await get(`/lectureDetail/${lectureCode}`);
	// console.log('fetchLectureDetail response:', response); 
    return response;
};

const LectureDetail = () => {
    const { auth } = AuthHook();
    const { setSubMenu } = useContext(HeaderContext);

    const [searchParams] = useSearchParams();
    const { lectureCode } = useParams();

    const navigate = useNavigate();

    const [statusData, setStatusData] = useState(null);

    const handleLectureList = () => {
        navigate('/lecture');
    };

    const { data, isLoading, isError, error } = useQuery(
        ['lectureDetail', lectureCode],
        () => fetchLectureDetail(lectureCode)
    );

    const mainCode = searchParams.get('mainCode');
    const selectedCategory = categoryLabels[mainCode];

	const lectureData = data?.result || {}; // 상세 정보 값


    useEffect(() => {
        const lectureMethod = searchParams.get('lectureMethod') || '전체';
        setSubMenu(lectureMethod);
    }, [searchParams, setSubMenu]);

    


    useEffect(() => {
        if (auth.isAuthenticated) {
			console.log('auth.isAuthenticated:', auth.isAuthenticated);

            post('/lectureStatus', {
                memberId: auth.userId,
                lectureId: parseInt(lectureCode, 10),
				enrollCode: lectureData.enrollCode,
            })
                .then(response => {
                    if (response.status && response.result.enroll) {
						console.log("결제상태 = " + response.result.paymentStatus);
						console.log("수강 상태 = " + response.result.enrollStatus);
						console.log("수강배정코드 = " + response.result.enroll.enrollCode);
                        setStatusData(response.result);
                    } else {
                        setStatusData(null);
                    }
                })
                .catch(error => {
                    console.error('상태 정보를 가져오는 중 오류 발생:', error);
                });
        } else {
			setStatusData(null); 
		}
    }, [auth.isAuthenticated, auth.userId, lectureCode, lectureData.enrollCode]);

    const handleApply = () => {
        if (!auth.isAuthenticated) {
            alert('로그인이 필요합니다.');
            return;
        }

        const requestData = {
            memberId: auth.userId,
            lectureId: parseInt(lectureCode, 10), // 10진수 처리
            amount: parseFloat(100, 10),
			lectureDate:lectureData.lectureDate,
        };

        post('/lectureApply', requestData)
            .then(response => {
				if (response.status) {
					console.log("데이터 = " + response.result.enrollStatus)
					alert(response.message || '교육 신청이 완료되었습니다.');
					setStatusData(response.result);
				} else {
					alert(response.message || '교육 신청에 실패했습니다.');
				}
            })
            .catch(error => {
				if (error.message) { 
					alert(error.message);
				} else {
					alert('오류가 발생했습니다. 다시 시도해 주세요.');
				}
				console.error('에러 상세 정보:', error);
			});
    };

    const handleCancel = () => {
        if (!auth.isAuthenticated) {
            alert('로그인이 필요합니다.');
            return;
        }

		const requestData = {
			enrollCode: statusData.enroll.enrollCode,
			lectureId: parseInt(lectureCode, 10),
		};

		post('/lectureCancel', requestData)
        .then(response => {
            console.log("취소 응답 데이터 확인 =", response);
            if (response.status) {
                alert(response.message || '교육 신청이 취소되었습니다.');
                setStatusData(null); // 상태 데이터 초기화 또는 필요한 업데이트 수행
            } else {
                alert(response.message || '교육 신청 취소에 실패했습니다.');
            }
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) { 
                alert(error.response.data.message);
            } else {
                alert('오류가 발생했습니다. 다시 시도해 주세요.');
            }
            console.error('에러 상세 정보:', error);
        });

    };

	const handlePayment = async () => {
		if (!auth.isAuthenticated) {
			alert('로그인이 필요합니다.');
			return;
		}
	
	};

    const initiatePaymentModule = (paymentData, callback) => {
        // 실제 결제를 진행해야 하는 함수
        // 결제 완료 후 callback(transactionId)를 호출

        // 예시: 임시로 setTimeout을 사용하여 결제 완료 시 콜백 호출
        setTimeout(() => {
            const transactionId = '거래ID쓰는곳'; 
            callback(transactionId);
        }, 2000);
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (isError) {
        return <div>오류가 발생했습니다: {error.message}</div>;
    }

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
                                    <div className="tit-T">{lectureData.lectureTitle}</div>
                                    <div className="lineTop_tb01"> 
                                        <table className="lineTop_tb">
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
                                                    <td>{lectureData.recStartDate} ~ {lectureData.recEndDate}</td>
                                                    <td>{lectureData.learnDate}</td>
                                                    <td>{lectureData.startTime} ~ {lectureData.endTime} ({lectureData.trainingTime}h)</td>
                                                    <td>{lectureData.enrolled}/{lectureData.capacity}</td>
                                                    <td>{lectureData.instructorName}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="view-txt">
                                        <span>교육대상</span>
                                        {lectureData.target || '교육 대상 정보 없음'}
                                        <span>관련법령</span>
                                        {lectureData.laws || '관련 법령 정보 없음'}
                                        <span>교육목표</span>
                                        <div dangerouslySetInnerHTML={{ __html: lectureData.objective }} />
                                        <span>교육내용</span>
                                        <div dangerouslySetInnerHTML={{ __html: lectureData.description }} />
                                        <span>수료조건</span>
                                        <p>출석(100%)</p>
                                        <b className="txt-red small-font">* 정해진 교육시간을 모두 이수했을 경우에만 수료 할 수 있습니다.</b>
                                        <span>교육장소</span>
                                        <p>{lectureData.location} {lectureData.locationDetail}</p>
                                        <KakaoMap address={lectureData.location} />
                                        <span>교육시간표</span>
											<FileList atchFileId={lectureData.atchFileId} />
                                        <span>폐강기준</span>
                                        교육생 인원이 10명 미만일 경우 자동으로 페강 처리 되며 교육일자 변경 또는 환불 됩니다 
                                        <div className="box-border">
                                            <span className="txt-red">유의사항</span>
                                            <b className="txt-point-img"><img src="/img/btn_point.png" alt="포인트" />환불조건</b> 신청 마감일까지 교육비 <b className="txt-blue">미결제 상태인 경우 신청</b> 취소 처리되며 <b className="txt-blue">신청 마감일 이후로부터~교육 당일 출석확인 전까지는 교육비
                                            환불 불가</b>
                                        </div>
										<div className="text-cent">
											{auth.isAuthenticated ? (
												statusData ? (
													<>
														{/* enrollStatus가 lecture.enroll인 경우 */}
														{statusData.enrollStatus === Globals.status.lecture.enroll && (
															<>
																{statusData.paymentStatus === Globals.status.payment.pending && (
																	<>
																		<button className="btn btn_red mt30" onClick={handlePayment}>결제하기</button>
																		<button className="btn btn-blue mt30 ml10" onClick={handleCancel}>교육 취소</button>
																		<button className="btn btn-blue mt30 ml10" onClick={handleLectureList}>목록으로</button>
																	</>
																)}
																{statusData.paymentStatus === Globals.status.payment.complete && (
																	<>
																		<button className="btn btn-blue mt30 ml10" onClick={handleCancel}>교육 취소 및 환불</button>
																		<button className="btn btn-blue mt30 ml10" onClick={handleLectureList}>목록으로</button>
																	</>
																)}
																{/* paymentStatus가 없을 경우도 처리 */}
																{!statusData.paymentStatus && (
																	<>
																		<button className="btn btn_red mt30" onClick={handlePayment}>결제하기</button>
																		<button className="btn btn-blue mt30 ml10" onClick={handleCancel}>교육 취소</button>
																		<button className="btn btn-blue mt30 ml10" onClick={handleLectureList}>목록으로</button>
																	</>
																)}
															</>
														)}
														
														{/* enrollStatus가 cancel 또는 expired인 경우 */}
														{(statusData.enrollStatus === Globals.status.lecture.cancel || 
														statusData.enrollStatus === Globals.status.lecture.expired) && (
															<>
																<button className="btn btn_red mt30" onClick={handleApply}>교육 신청</button>
																<button className="btn btn-blue mt30 ml10" onClick={handleLectureList}>목록으로</button>
															</>
														)}
													</>
												) : (
													<>
														{/* 상태 데이터가 없을 때: 기본 신청 버튼 */}
														<button className="btn btn_red mt30" onClick={handleApply}>교육 신청</button>
														<button className="btn btn-blue mt30 ml10" onClick={handleLectureList}>목록으로</button>
													</>
												)
											) : (
												<>
													<button className="btn btn_red mt30" onClick={handleApply}>교육 신청</button>
													<button className="btn btn-blue mt30 ml10" onClick={handleLectureList}>목록으로</button>
												</>
											)}
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
