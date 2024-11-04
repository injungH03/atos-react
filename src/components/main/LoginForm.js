import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { post } from '@utils/axios_api';
import { useNavigate } from 'react-router-dom';
import { AuthHook } from '@hooks';

// 유효성 검사 스키마
const validationSchema = Yup.object().shape({
    id: Yup.string().required('아이디는 필수입니다.'),
    password: Yup.string().required('비밀번호는 필수입니다.'),
});

const LoginForm = () => {
    const {auth, login} = AuthHook();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { id: '', password: '' },
    });

    const onSubmit = async (data) => {
        setServerError('');
        console.log('Submitted data:', data);
        try {
            const loginData = { username: data.id, password: data.password };
            const response = await post('/login', loginData);

            console.log('Response:', response);

            localStorage.setItem('jwt', response.token);
            login(response.role, response.userId);
            navigate('/main'); 
            reset();
        } catch (err) {
            setServerError(err.response?.data?.error || '로그인에 실패했습니다.');
            console.error(err);
        }
    };

    return (
        <div className="loginbox mu_member">
            <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                <dl className="inputBox">
                    <dd>
                        <div className="fz35 bold">Login</div>
                        {serverError && <p className="error-message">{serverError}</p>}
                        <div className="id_input_wrap">
                            <div>
                                <p className="fz16 fw500">아이디</p>
                                <input
                                    type="text"
                                    {...register('id')}
                                    className="c2 enterArea"
                                    maxLength="20"
                                    placeholder="아이디를 입력해 주세요."
                                />
                                {errors.id && <span className="error-message">{errors.id.message}</span>}
                            </div>
                            <div>
                                <p className="fz16 fw500">비밀번호</p>
                                <input
                                    type="password"
                                    {...register('password')}
                                    maxLength="20"
                                    className="c4 enterArea"
                                    placeholder="비밀번호를 입력해 주세요."
                                />
                                {errors.password && <span className="error-message">{errors.password.message}</span>}
                            </div>
                        </div>
                    </dd>
                </dl>
                <div className="f_b">
                    <div className="idSaveBox input_chk">
                        <input type="checkbox" id="chk_id_cookie" />
                        <label htmlFor="chk_id_cookie" className="input_chk_label fz13 fw500">아이디 저장</label>
                    </div>
                    <p className="menuBox">
                        <a href="#" className="fz13 fw600">아이디 찾기 / 비밀번호 찾기</a>
                    </p>
                </div>
                <button type="submit" className="btn_login btn_submit btn_color wid" disabled={isSubmitting}>
                    {isSubmitting ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
