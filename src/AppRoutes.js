import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {MainPage, SignupPage, Main, LectureList, LectureDetail, Resources, NotFound} from '@pages';
import {ProtectedRoute, Layout, MainLayout} from '@components';
import { HeaderProvider } from '@context/HeaderContext';

function AppRoutes() {
  return (
    <HeaderProvider>
        <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
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
            <Route path="/signup2"
                element={
                        <SignupPage />
                }
            />
            <Route path="/main"
                element={
                    <MainLayout>
                        <Main />
                    </MainLayout>
                }
            />
                    
            <Route path="/lecture" 
                element={
                    <Layout>
                        <LectureList />
                    </Layout>
                } 
            />
            <Route path="/lecture/detail/:lectureCode" 
                element={
                    // <ProtectedRoute roles={['ROLE_ADMIN', 'ROLE_USER']}>
                        <Layout>
                            <LectureDetail />
                        </Layout>
                    // </ProtectedRoute>
                } 
            />

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

        </Routes>
    </HeaderProvider>
  );
}

export default AppRoutes;