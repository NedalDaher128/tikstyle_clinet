//  المكتبات الأساسية
import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
import { Box } from '@mui/system';


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
  let [message_error, set_message_error] = useState<FormValue>({ username: "", name: "", email: "", password: "" })
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

    } catch (error: any) {
      // هنا يمكنك التعامل مع أي خطأ قد يحدث أثناء الطلب إلى الخادم (مثل عرض رسالة خطأ للمستخدم)
      set_message_error(error.response.data.handleErrorsm)
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
    <Box className="flex flex-row  justify-between items-center   "
      sx={{
        flexDirection: { xs: "column", md: "row" }
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
      />      {/* صورة تعبيرية  */}
      {/* جدول ويحتوي على الحقول المسوؤلة عن انشاء الحساب */}
      <div className='  basis-1/3'>
        <form onSubmit={AxiosRegister} className='flex flex-col  justify-center '>
          {/* نصوص رئيسية */}
          <h1 className=' text-4xl'>حساب جديد</h1>
          <p className=' text-xl'>ادخل تفاصيل حسابك في الحقول</p>
          <div className='flex flex-col gap-10'>
            {/* حلقة تكرارية لأنشاء حقول الادخال */}
            {inputFeiild.map((item) => (
              <div>
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
                <p className='text-red-500' >{message_error[item.type as keyof FormValue]}</p>
              </div>
            ))}
            {/* زر لارسال الطلب لانشاء الحساب */}
            <Button type='submit' style={buttonStyle} variant="contained">انشاء حساب</Button>
            {/* رابط سريع لصفحة تسجيل الدخول */}
            <Link to="/login">هل لديك حساب مسبقا قم بتسجيل الدخول</Link>
          </div>
        </form>
      </div>
      <div className='basis-1/2' >
        <Animation_Login />
      </div>
    </Box>

  );
}
