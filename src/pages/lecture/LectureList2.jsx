import React, { useContext } from 'react';
import {Footer, HeaderNavi, LeftMenu, SearchBox, Pagination} from '@components';
import { useNavigate, useSearchParams, useLocation  } from 'react-router-dom';
import { useQuery } from 'react-query';
import { get} from '@utils/axios_api';

const categoryLabels = {
    A001: '관리감독자',
    A002: '근로자',
    A003: '위험성평가자',
};


const fetchLectures = async ({ queryKey: [, params] }) => {
    const { mainCode, subCode, searchWrd, pageIndex, recordCountPerPage, lectureMethod } = params;
    const response = await get('/lectureList', {
        params: { mainCode, subCode, searchWrd, pageIndex, recordCountPerPage, lectureMethod },
    });
    // console.log('데이터 확인 = ', response);
    return response;
};


const LectureList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const mainCode = searchParams.get('mainCode') || '';
    const subCode = searchParams.get('subCode') || '';
    const searchWrd = searchParams.get('searchWrd') || '';
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1', 10);
    const lectureMethod = searchParams.get('lectureMethod') || '집체교육';
    const itemsPerPage = 6;

    const navigate = useNavigate();
    const location = useLocation();
    const now = new Date();

    const { data, isLoading, isError, error } = useQuery(
        ['selectLectureList', mainCode, subCode, searchWrd, pageIndex, itemsPerPage, lectureMethod],
        () => fetchLectures({ mainCode, subCode, searchWrd, pageIndex, recordCountPerPage: itemsPerPage, lectureMethod }),
        {
          keepPreviousData: true,
          staleTime: 5 * 60 * 1000,
        }
      );

    const handlePageChange = (pageNumber) => {
        setSearchParams({ mainCode, subCode, searchWrd, pageIndex: pageNumber, lectureMethod });
    };

    const handleSearch = (newCriteria) => {
        setSearchParams({ ...newCriteria, pageIndex: 1, lectureMethod });
    };

    const isAvailableForEnrollment = (item) => {
        const recEndDate = new Date(item.recEndDate);
        recEndDate.setHours(23, 59, 59, 999); // 하루의 끝으로 설정

        return item.capacity > item.enrolled && recEndDate >= now;
    };


    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (isError) {
        return <div>오류가 발생했습니다: {error.message}</div>;
    }

  return (
    <main id="main" className="mainpage">
            <>
            <div>
            <div className="section main-contact">

                <HeaderNavi  selectedCategory={categoryLabels[mainCode]}  />
                
                <div className="sub-container">
                    <div className="sub-layout">
                        <LeftMenu />

                        <div className="sub-contact">
                            <h3 className="border-bt">{lectureMethod}</h3>

                            <SearchBox
                                onSearch={handleSearch}
                                initialValues={{ mainCode, subCode, searchWrd }}
                            />
									
                            <div>
                                {data.resultList && data.resultList.length > 0 ? (
                                    <ul className="sub_banner mb50">
                                        {data.resultList.map((item) => (
                                            <li key={item.lectureCode}>
                                                {/* <span className="no01">{item.mainName} - {item.subName}</span> */}
                                                <span className="no01">{item.lectureMethod}</span>
                                                <b>{item.lectureTitle}</b>
                                                <dl>
                                                    <dt>신청기간</dt>
                                                    <dd>{item.recStartDate} ~ {item.recEndDate}</dd>
                                                </dl>
                                                <dl>
                                                    <dt>교육일시</dt>
                                                    <dd>{item.learnDate} ({item.trainingTime}h)</dd>
                                                </dl>
                                                <dl>
                                                    <dt>정원</dt>
                                                    <dd>{item.enrolled} / {item.capacity}</dd>
                                                </dl>
                                                <div className="text-cent">
                                                    {isAvailableForEnrollment(item) ? (
                                                        <button
                                                            className="btn btn_red mt30"
                                                            onClick={() => navigate(`/lecture/detail/${item.lectureCode}${location.search}`)}
                                                        >
                                                            교육신청
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn_bl mt30" disabled>
                                                            교육마감
                                                        </button>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                        <span style={{ marginLeft: '10px' }}>검색 결과가 없습니다.</span>
                                )}

                                {data?.paginationInfo && data.paginationInfo.totalRecordCount > 0 && (
                                    <Pagination
                                        totalPages={Math.ceil(
                                            data.paginationInfo.totalRecordCount / data.paginationInfo.recordCountPerPage
                                        )}
                                        currentPage={pageIndex}
                                        onPageChange={handlePageChange}
                                        pageRangeDisplayed={5} // 필요에 따라 조정
                                    />
                                )}
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


export default LectureList;
