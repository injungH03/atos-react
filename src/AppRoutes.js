import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {MainPage, SignupPage, Main, LectureList, LectureDetail, Resources, NotFound, SafetyEducation, SafetyManagement, SafetyRisk, SafetyWorker } from '@pages';
import {ProtectedRoute, Layout, MainLayout} from '@components';
import { HeaderProvider } from '@context/HeaderContext';

function AppRoutes() {
  return (
    <HeaderProvider>
        <Routes>
            <Route path="/" element={<Navigate to="/main" />} />

            <Route path="/main"
                element={
                    <MainLayout>
                        <Main />
                    </MainLayout>
                }
            />
            {/* 교육 신청 URL 시작 */}        
            <Route path="/lecture" 
                element={
                    <Layout>
                        <LectureList />
                    </Layout>
                } 
            />
            <Route path="/lecture/detail/:lectureCode" 
                element={
                    <Layout>
                        <LectureDetail />
                    </Layout>
                } 
            />
            {/* 교육 신청 URL 끝 */}

            {/* 안전보건교육소개 URL 시작*/}
            <Route path="/safety" 
                element={
                    <Layout>
                        {<SafetyEducation />}
                    </Layout>
                } 
            />
            <Route path="/safety/management" 
                element={
                    <Layout>
                        {<SafetyManagement />}
                    </Layout>
                } 
            />
            <Route path="/safety/worker" 
                element={
                    <Layout>
                        {<SafetyWorker />}
                    </Layout>
                } 
            />
            <Route path="/safety/risk" 
                element={
                    <Layout>
                        {<SafetyRisk />}
                    </Layout>
                } 
            />
            {/* 안전보건교육소개 URL 끝*/}

            

            <Route path="/support/resources" 
                element={
                    // <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                        <Layout>
                            <Resources />
                        </Layout>
                    // </ProtectedRoute>
                } 
            />
                


            <Route path="*" element={<NotFound />} />


            {/* 테스트 URL */}        
            <Route path="/react-main"
                element={
                    <MainPage />
                }
            />
            <Route path="/signup"
                element={
                    <SignupPage />
                }
            />

        </Routes>
    </HeaderProvider>
  );
}

export default AppRoutes;