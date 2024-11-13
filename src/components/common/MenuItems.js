const menuItems = [
    {
        title: '안전보건교육소개',
        subItems: [
            { title: '안전보건교육이란?', link: '/safety' },
            { title: '관리감독자 정기교육', link: '/safety/management' },
            { title: '근로자 정기교육', link: '/safety/worker' },
            { title: '위험성평가 교육', link: '/safety/risk' },
        ],
    },
    {
        title: '교육신청',
        subItems: [
            { title: '집체교육', link: '/lecture?lectureMethod=집체교육' },
            { title: '온라인교육', link: '/lecture?lectureMethod=온라인교육' },
            { title: '비대면교육', link: '/lecture?lectureMethod=비대면교육' },
            { title: '단체교육', link: '/lecture?lectureMethod=단체교육' },
            { title: '혼합교육', link: '/lecture?lectureMethod=혼합교육' },
        ],
    },
    {
        title: '학습지원센터',
        subItems: [
            { title: '공지사항', link: '/support/notice' },
            { title: '자료실', link: '/support/resources', requiresLogin: true },
            { title: 'Q&A', link: '/support/qna', requiresLogin: true },
            { title: '1:1문의', link: '/support/ask', requiresLogin: true },
        ],
    },
    // {
    //     title: '고객지원',
    //     subItems: [
    //         { title: '대리점 안내', link: '/support/dealers' },
    //         { title: '문의하기', link: '/support/contact' },
    //     ],
    // },
    {
        title: '나의강의실',
        subItems: [
            { title: '나의강의', link: '/mypage/lectures' },
        ],
        requiresAuth: true, 
    },
];

export default menuItems;
