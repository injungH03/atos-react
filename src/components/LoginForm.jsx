// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { post } from '@utils/axios_api';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Input} from '@components/form';
import { AuthContext  } from '@context';
import { useNavigate } from 'react-router-dom';


// 유효성 검사 스키마 정의
const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('아이디는 필수입니다.'),
    password: Yup.string()
        .required('비밀번호는 필수입니다.'),
});

const LoginForm = () => {
    const { login } = useContext(AuthContext ); 
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            id: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        setServerError('');

        try {
            const loginData = {
                username: data.id, // Spring Security는 기본적으로 'username' 필드를 사용
                password: data.password,
            };

            const response = await post('/login', loginData); // response는 response.data

            console.log('응답 데이터 :', response);
            
            localStorage.setItem('jwt', response.token);

            login(response.role);

            // 로그인 성공 시 역할에 따라 페이지 이동
            // if (response.role === 'ROLE_ADMIN') {
            //     navigate('/admin/member/boardList');
            // } else if (response.role === 'ROLE_INSTRUCTOR') {
            //     navigate('/instructor/dashboard');
            // } else if (response.role === 'ROLE_USER') {
            //     navigate('/user/home');
            // } else {
            //     navigate('/react-main');
            // }

            // navigate('/react-main');

            reset();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) { 
                setServerError(err.response.data.error);
            } else {
                setServerError('로그인에 실패했습니다. 다시 시도해주세요.2222222');
            }
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <h3>로그인</h3>

                {serverError && <p style={styles.error}>{serverError}</p>}

                {/* 아이디 필드 */}
                <Input
                    label="아이디:"
                    name="id"
                    register={register}
                    required
                    placeholder="아이디를 입력하세요"
                    errors={errors.id}
                />

                {/* 비밀번호 필드 */}
                <Input
                    label="비밀번호:"
                    name="password"
                    type="password"
                    register={register}
                    required
                    placeholder="비밀번호를 입력하세요"
                    errors={errors.password}
                />

                <button type="submit" style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    form: {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
};

export default LoginForm;
