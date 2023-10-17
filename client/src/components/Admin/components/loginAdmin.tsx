// المكتبات الرئيسية
import React, { useState, FormEvent } from 'react';
import {  useNavigate } from 'react-router-dom';

import AxiosDataBase from "../../../Axios/AxiosDataBase"
import { useDispatch } from 'react-redux'
import { loginAdmin } from "../../../redux/Silce/AccountSilceAdmin"
import { show_message } from "../../shared/messagepoup"
import { show_message_error } from '../../shared/MessagErrorLogin';
import { ToastContainer } from 'react-toastify';

// مكتبات التصميم
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BackgroundImg from "../../../assets/img/background_admin.jpg"

// كمبونت تسجيل الدخول الادمن
export default function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  interface TypeData {
    email: string
    password: string
  }
  type FormValuesKeys = keyof TypeData;

  const [fromvalue, setfromvalue] = useState<TypeData>({ email: "", password: "" })
  // fromvalue  دالة وضع البيانات في المتغير الرئيسي 
  const HandleSetData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setfromvalue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //دالة تسجيل الدخول
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const DataSubmit = {
      email: fromvalue.email,
      password: fromvalue.password
    };

    try {
      const response = await AxiosDataBase.axiosAdmin.post('/login', DataSubmit);
      dispatch(loginAdmin(response.data.token));
      show_message();
      console.log(response.data.token);

      // توجيه المستخدم إلى "/admin/dashboard" بعد نجاح تسجيل الدخول
      setTimeout(() => {
        navigate('/admin/dashboard');

      }, 4500);
    } catch (error) {
      show_message_error();
      console.error(error);
    }
  };


  console.log(fromvalue)
  // تعريف نوقع بيانات
  const typeInputs: { type: string, lable: string }[] = [{ type: "email", lable: "بريد الاكتروني" }, { type: "password", lable: "كلمة السر" }]

  //تصميم زر تسجيل الدخول
  const buttonStyle: React.CSSProperties = { // تحديد نوع الكائن
    color: 'white',
    backgroundColor: '#DB4444',
    padding: '15px',
  };

  return (
    <div className=' h-screen  w-screen flex flex-row'>
                 {
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

            }
      <div className=' w-1/2'  >
        <img className='h-screen object-cover backdrop-blur  bg-center	' style={{ width: "700px" }} src={BackgroundImg} alt="" />
      </div>
      <div className='w-3/4  p-52 '>
        <form className='grid grid-cols-2' onSubmit={handleLogin}>
          <span className='flex flex-col pb-14 col-span-2  gap-4'>
            <h1 className=' text-6xl'>تسجيل دخول الادمن </h1>
            <p>مرحبًا بك مرة أخرى، أنت في صفحة إدارة المتجر</p>
          </span>
          <div className='flex flex-col  gap-20  '>
            {
              typeInputs.map((inputType) => (
                <TextField
                  key={inputType.type}
                  type={inputType.type}
                  label={inputType.lable.charAt(0).toUpperCase() + inputType.lable.slice(1)}
                  name={inputType.type}
                  value={fromvalue[inputType.type as FormValuesKeys]}
                  onChange={HandleSetData}
                  style={{ width: "400px" }}
                />
              ))
            }

          </div>
          <div className=' col-span-2 mt-10 '>
            <Button type='submit' className=' w-36 ' style={buttonStyle} variant='contained'>
              تسجيل دخول
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
