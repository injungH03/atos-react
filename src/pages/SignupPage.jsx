// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { post } from '@utils/axios_api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Input, Radio, Checkbox} from '@components/form';


const validationSchema = Yup.object().shape({
    id: Yup.string()
        .min(4, '아이디는 최소 4자 이상이어야 합니다.')
        .max(20, '아이디는 최대 20자 이하이어야 합니다.')
        .required('아이디는 필수입니다.'),
    password: Yup.string()
        .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
        .required('비밀번호는 필수입니다.'),
    name: Yup.string()
        .required('이름은 필수입니다.'),
    email: Yup.string()
        .email('이메일 형식이 올바르지 않습니다.')
        .required('이메일은 필수입니다.'),
    roleId: Yup.string()
        .oneOf(['R2', 'R1', 'R0'], '유효하지 않은 역할입니다.')
        .required('역할은 필수입니다.'),
    terms: Yup.bool()
        .oneOf([true], '이용 약관에 동의해야 합니다.')
        .required('이용 약관에 동의해야 합니다.'),
    // 추가 필드가 필요하면 여기에 정의
});

const SignupPage = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState('');

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
            name: '',
            email: '',
            roleId: 'R2', // 기본값: 일반
            terms: false,
        },
    });

    const onSubmit = async (data) => {
        setServerError('');
        setSuccess('');

        try {
            const response = await post('/signup', data);

            console.log('응답 데이터 :', response);

            setSuccess(response.message);
            reset();

            // 2초 후 메인 페이지로 이동
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setServerError(err.response.data.message);
            } else {
                setServerError('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <h3>회원가입</h3>

                {serverError && <p style={styles.error}>{serverError}</p>}
                {success && <p style={styles.success}>{success}</p>}

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

                {/* 이름 필드 */}
                <Input
                    label="이름:"
                    name="name"
                    register={register}
                    required
                    placeholder="이름을 입력하세요"
                    errors={errors.name}
                />

                {/* 이메일 필드 */}
                <Input
                    label="이메일:"
                    name="email"
                    type="email"
                    register={register}
                    required
                    placeholder="이메일을 입력하세요"
                    errors={errors.email}
                />

                {/* 역할 필드 (라디오 버튼) */}
                <div style={styles.inputGroup}>
                    <label>역할:</label>
                    <div style={styles.radioContainer}>
                        <Radio
                            label="일반"
                            name="roleId"
                            value="R2"
                            register={register}
                            required
                            errors={errors.roleId}
                        />
                        <Radio
                            label="강사"
                            name="roleId"
                            value="R1"
                            register={register}
                            required
                            errors={errors.roleId}
                        />
                        <Radio
                            label="관리자"
                            name="roleId"
                            value="R0"
                            register={register}
                            required
                            errors={errors.roleId}
                        />
                    </div>
                </div>

                {/* 이용 약관 동의 (Checkbox) */}
                <Checkbox
                    label="이용 약관에 동의합니다."
                    name="terms"
                    register={register}
                    required
                    errors={errors.terms}
                />

                {/* 추가적인 폼 요소가 필요하면 여기에 추가 */}

                <button type="submit" style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
};

// 기본 스타일 정의
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
    },
    form: {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '400px',
        width: '100%',
    },
    inputGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    radioContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5px',
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
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        fontSize: '12px',
        marginBottom: '10px',
    },
};

export default SignupPage;
