import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { post } from '@utils/axios_api';
import { useNavigate } from 'react-router-dom';
import { AuthHook } from '@hooks';
import { Input, Checkbox } from '@components/form';

// 유효성 검사 스키마
const validationSchema = Yup.object().shape({
    id: Yup.string().required('아이디는 필수입니다.'),
    password: Yup.string().required('비밀번호는 필수입니다.'),
});

const LoginForm = () => {
    const {auth, login} = AuthHook();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    
    const [isIdSaved, setIsIdSaved] = useState(localStorage.getItem('isIdSaved') === 'true'); // 아이디 저장 여부
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { id: '', password: '' },
    });

    const handleIdSaveChange = (e) => {
        setIsIdSaved(e.target.checked);
        localStorage.setItem('isIdSaved', e.target.checked ? 'true' : 'false');
    };

    useEffect(() => {
        if (isIdSaved) {
            const savedUserId = localStorage.getItem('savedUserId');
            if (savedUserId) setValue('id', savedUserId); // 저장된 아이디를 id 필드에 채움
        }
    }, [isIdSaved, setValue]);


    const onSubmit = async (data) => {
        setServerError('');
        try {
            const loginData = { username: data.id, password: data.password };
            const loginInfo = await post('/login', loginData);

            // console.log('loginInfo:', loginInfo);
            // if (isIdSaved) {
            //     localStorage.setItem('savedUserId', data.id);
            // } else {
            //     localStorage.removeItem('savedUserId');
            // }
            isIdSaved ? localStorage.setItem('savedUserId', data.id) : localStorage.removeItem('savedUserId');
            
            login(loginInfo);
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
                                <Input
                                    name="id"
                                    type="text"
                                    placeholder="아이디를 입력해 주세요."
                                    register={register}
                                    required={true}
                                    maxLength="30"
                                    errors={errors.id}
                                    inputClassName="c2 enterArea"
                                />
                            </div>
                            <div>
                                <p className="fz16 fw500">비밀번호</p>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호를 입력해 주세요."
                                    register={register}
                                    required={true}
                                    maxLength="20"
                                    errors={errors.password}
                                    inputClassName="c4 enterArea"
                                />
                            </div>
                        </div>
                    </dd>
                </dl>
                <div className="f_b">
                    <Checkbox
                        label="아이디 저장"
                        name="saveId"
                        register={register}
                        required={false}
                        className="idSaveBox input_chk"
                        checkboxClassName="checkbox"
                        labelClassName="input_chk_label fz13 fw500" 
                        onChange={handleIdSaveChange} 
                        checked={isIdSaved}
                    />
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
