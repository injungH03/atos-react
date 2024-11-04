import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const HeaderContext = createContext({
    headerMenu: '',
    setHeaderMenu: () => {},
    subMenu: '',
    setSubMenu: () => {},
});

const pathMappings = [
    {
        path: /^\/lecture/,
        headerMenu: '교육신청',
        getSubMenu: (location) => {
            const params = new URLSearchParams(location.search);
            return params.get('lectureMethod') || '전체';
        },
    },
    {
        path: /^\/main/,
        headerMenu: '홈',
        subMenu: '',
    },
    {
        path: /^\/safety-education/,
        headerMenu: '안전보건교육소개',
        getSubMenu: (location) => {
            const subPath = location.pathname.split('/safety-education/')[1];
            if (subPath) {
                const subMenuMapping = {
                    management: '관리감독자 정기교육',
                    worker: '근로자 정기교육',
                    'risk-assessment': '위험성평가 교육',
                };
                return subMenuMapping[subPath] || '안전보건교육이란?';
            }
            return '안전보건교육이란?';
        },
    },
    {
        path: /^\/support\/notice/,
        headerMenu: '학습지원센터',
        subMenu: '공지사항',
    },
    {
        path: /^\/support\/resources/,
        headerMenu: '학습지원센터',
        subMenu: '자료실',
    },
    {
        path: /^\/support\/qna/,
        headerMenu: '학습지원센터',
        subMenu: 'Q&A',
    },
    {
        path: /^\/support\/ask/,
        headerMenu: '학습지원센터',
        subMenu: '1:1문의',
    },
    {
        path: /^\/support\/dealers/,
        headerMenu: '고객지원',
        subMenu: '대리점 안내',
    },
    {
        path: /^\/support\/contact/,
        headerMenu: '고객지원',
        subMenu: '문의하기',
    },
    {
        path: /^\/mypage/,
        headerMenu: '나의강의실',
        subMenu: '나의강의',
    },
];

export const HeaderProvider = ({ children }) => {
    const [headerMenu, setHeaderMenu] = useState('');
    const [subMenu, setSubMenu] = useState('');
    const location = useLocation();

    useEffect(() => {
        for (let mapping of pathMappings) {
            if (mapping.path.test(location.pathname)) {
                setHeaderMenu(mapping.headerMenu);
                if (mapping.getSubMenu) {
                    setSubMenu(mapping.getSubMenu(location));
                } else {
                    setSubMenu(mapping.subMenu || '');
                }
                return;
            }
        }
        setHeaderMenu('');
        setSubMenu('');
    }, [location]);

    return (
        <HeaderContext.Provider value={{ headerMenu, setHeaderMenu, subMenu, setSubMenu }}>
            {children}
        </HeaderContext.Provider>
    );
};
