//  المكتبات الأساسية
import React, { ChangeEvent } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { login } from "../../redux/Silce/AccountSilce"
import AxiosDataBase from "../../Axios/AxiosDataBase"

// مكتبات التصميم
import { ToastContainer } from 'react-toastify';
import { show_message } from '../shared/messagepoup';
import Animation_Login from "../Admin/Animation/Animation_Login"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';


// تعريف نوع البيانات
interface FormValue {
  username: string,
  name: string,
  email: string,
  password: string,
}
type FromValueskey = keyof FormValue

//  ارجاع الكمبونت
export default function Login(): JSX.Element {
  // متغير المسؤول عن معلومات انشاء الحساب
  const [valueform, setvalueform] = React.useState<FormValue>({ username: "", name: "", email: "", password: "" });
  const dispatch = useDispatch()
  const nagtive = useNavigate()

  // ارسال طلي انشاء الحساب
  const AxiosRegister = async (e: any) => {
    e.preventDefault();
    // هنا يمكنك إجراء التحقق من صحة البيانات (مثل التحقق من الحقول المطلوبة وصحة البريد الإلكتروني وغيرها)
    try {
      const response = await AxiosDataBase.axiosLogin.post('/register', valueform)
      if (response.status === 201) {
        dispatch(login(response))
        show_message()
        nagtive("/")
      }

    } catch (error) {
      // هنا يمكنك التعامل مع أي خطأ قد يحدث أثناء الطلب إلى الخادم (مثل عرض رسالة خطأ للمستخدم)
      console.error(error);
    }
  };

  //  تصيم زر ارسال الطلب
  const buttonStyle = {
    color: 'white',
    backgroundColor: '#DB4444',
    padding: "15px",
  };

  // دالة مسؤولة عن اخذ البيانات من الحقول ووضعها في القيمة داخل الحقل
  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setvalueform((prevValueForm) => ({
      ...prevValueForm,
      [name]: value,
    }));
  };
  interface InputField {
    type: FromValueskey;
    label?: string;
  }
  // يحتوي على انواع حقول الادخال

  const inputFeiild: InputField[] = [
    { type: "name", label: "اسمك" },
    { type: "email", label: "بريدك الالكتروني" },
    { type: "username", label: "اسم المستخدم" },
    { type: "password", label: "كلمة المرور" },
  ];



  return (
    <div dir='rtl' id='content_login' className=' flex flex-row  justify-around'>
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
      />      {/* صورة تعبيرية  */}
      <Animation_Login />
      {/* جدول ويحتوي على الحقول المسوؤلة عن انشاء الحساب */}
      <form className=' p-52' onSubmit={AxiosRegister}>
        {/* نصوص رئيسية */}
        <h1 className=' text-4xl'>حساب جديد</h1>
        <p className=' text-xl'>ادخل تفاصيل حسابك في الحقول</p>
        <div className='flex flex-col gap-10'>
          {/* حلقة تكرارية لأنشاء حقول الادخال */}
          {inputFeiild.map((item) => (
            <TextField dir='rtl'
              key={item.type}
              inputProps={{ style: { width: '340px', borderColor: "red" } }}
              id={item.type}
              label={item.label}
              name={item.type}
              type={item.type === "password" ? "password" : "text"}
              value={valueform[item.type as FromValueskey]}
              onChange={handleInputData}
              variant="standard"
            />
          ))}
          {/* زر لارسال الطلب لانشاء الحساب */}
          <Button type='submit' style={buttonStyle} variant="contained">انشاء حساب</Button>
          {/* رابط سريع لصفحة تسجيل الدخول */}
          <Link to="/login">هل لديك حساب مسبقا قم بتسجيل الدخول</Link>
        </div>
      </form>
    </div>

  );
}
