// مكتبات الرئيسية لعمل الكمبونت 
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import AxiosDataBase from "../../Axios/AxiosDataBase";
import { login } from "../../redux/Silce/AccountSilce";
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
// مكتبات المسؤولة عن التصميم
import { ToastContainer } from 'react-toastify'; // مكتبة لعرض رسائل سريعة
import TextField from '@mui/material/TextField'; // حقل إدخال من تصميم
import Button from '@mui/material/Button'; // زر من تصميم
import { show_message } from '../shared/messagepoup'; // استدعاء الرسالة التي ستظهر
import Animation_Login from "../Admin/Animation/Animation_Login"; // الصورة المتحركة

// تعريف أنواع البيانا"..ت المستخدمة في النموذج
type FormValuesKeys = keyof FormValues;
// تعريف أنواع البيانات المستخدمة في النموذج
interface FormValues {
    username: string;
    password: string;
}


export default function Login() {
    // استخدام الهوائيات لإدارة الحالة
    const [valueform, setvalueform] = useState<FormValues>({ username: '', password: '' });
    let [errorMessages, setErrorMessages] = useState<FormValues>({ username: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            const response = await AxiosDataBase.axiosLogin.post('/login', valueform);

            if (response.status === 201) {
                dispatch(login(response));
                show_message();
                navigate("/");
            } else if (response.status === 409) {
                // قم بما تحتاج إلى فعله عندما تكون الحالة 409
                // على سبيل المثال:
                console.log("Conflict detected. Handle it here.");
            }
            // إعادة توجيه المستخدم بعد الانتهاء من الإرسال
        } catch (error: any) {
            setErrorMessages(error.response.data.messageerror)
            // يمكنك أيضًا التعامل مع الأخطاء هنا
        }
    };



    // تعريف نوع الحقل لكل حقل إدخال
    const typeInput: { type: keyof FormValues, label: string }[] = [
        { type: 'username', label: "اسم المستخدم" },
        { type: 'password', label: "كلمة المرور" }
    ];

    return (
        <Box className="flex flex-row  justify-between items-center   "
         sx={{
            flexDirection:{xs:"column",md:"row"}
         }}
        >
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
            <div className=' basis-1/3'>
                <form onSubmit={AxiosLogin}>
                    <h1 className='text-4xl'>تسجيل الدخول إلى تطبيق الويب</h1>
                    <p className='text-xl'>قم بإدخال بياناتك أدناه</p>
                    <div className='flex flex-col gap-10'>
                        {typeInput.map((items: any) => (
                            <div>
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
                                <p className='text-red-600'>{errorMessages[items.type as keyof FormValues]}</p>
                            </div>


                        ))}
                        <div className='boxButtenLogin flex flex-row justify-between items-center'>
                            <Button type='submit' className='w-40 ' style={buttonStyle} variant='contained'>
                                تسجيل الدخول
                            </Button>
                            <Link to='/register'>التسجيل</Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className=' basis-1/2 '>
                <Animation_Login />
            </div>

        </Box>
    );
}
