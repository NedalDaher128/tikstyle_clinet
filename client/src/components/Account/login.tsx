// مكتبات الرئيسية لعمل الكمبونت 
import React, { useState, ChangeEvent, FormEvent } from 'react';
import {  useDispatch } from 'react-redux';
import AxiosDataBase from "../../Axios/AxiosDataBase";
import { login } from "../../redux/Silce/AccountSilce";
import { Link } from 'react-router-dom';

// مكتبات المسؤولة عن التصميم
import { ToastContainer } from 'react-toastify'; // مكتبة لعرض رسائل سريعة
import TextField from '@mui/material/TextField'; // حقل إدخال من تصميم
import Button from '@mui/material/Button'; // زر من تصميم
import { show_message } from '../shared/messagepoup'; // استدعاء الرسالة التي ستظهر
import Animation_Login from "../Admin/Animation/Animation_Login"; // الصورة المتحركة

// تعريف أنواع البيانات المستخدمة في النموذج
type FormValuesKeys = keyof FormValues;
interface FormValues {
    username: string;
    password: string;
}

export default function Login() {
    // استخدام الهوائيات لإدارة الحالة
    const [valueform, setvalueform] = useState<FormValues>({ username: '', password: '' });
    const dispatch = useDispatch();

    // تابع للتعامل مع تغييرات الحقول
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in valueform) {
            setvalueform((prevValueForm) => ({
                ...prevValueForm,
                [name]: value,
            }));
        }
    };

    // تنسيق الأسلوب للزر
    const buttonStyle: React.CSSProperties = {
        color: 'white',
        backgroundColor: '#DB4444',
        padding: '15px',
    };

    // تقديم النموذج عند الضغط على الزر
    const AxiosLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة الافتراضية للنموذج
        try {
           const respone = await AxiosDataBase.axiosLogin.post('/login', valueform)
            if (respone.status === 201) {
                dispatch(login(respone));
                show_message();
            }
            // إعادة توجيه المستخدم بعد الانتهاء من الإرسال
        } catch (error) {
            console.error(error);
        }
    };

    
    // تعريف نوع الحقل لكل حقل إدخال
    const typeInput: { type: string,label:string }[] = [{ type: 'username',label:"اسم المستخدم" }, { type: 'password',label:"كلمة المرور" }];

    return (
        <div id='content_login' className='flex flex-row justify-around'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Animation_Login />
            <form className='p-52 ' onSubmit={AxiosLogin}>
                <h1 className='text-4xl'>تسجيل الدخول إلى تطبيق الويب</h1>
                <p className='text-xl'>قم بإدخال بياناتك أدناه</p>
                <div className='flex flex-col gap-10'>
                    {typeInput.map((items) => (
                        <TextField
                            inputProps={{ style: { width: '340px', borderColor: 'red' } }}
                            id={items.type}
                            type={items.type === "password" ? "password" : "text"}
                            label={items.label}
                            name={items.type}
                            key={items.type}
                            value={valueform[items.type as FormValuesKeys]}
                            onChange={handleChangeValue}
                            variant='standard'
                        />
                    ))}
                    <div className='boxButtenLogin flex flex-row justify-between items-center'>
                        <Button type='submit' className='w-40 ' style={buttonStyle} variant='contained'>
                            تسجيل الدخول
                        </Button>
                        <Link to='/register'>التسجيل</Link>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
