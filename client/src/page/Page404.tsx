import React from 'react'
import Header from '../components/shared/header'
import Footer from '../components/shared/footer'
import Button from '@mui/material/Button';
import {  useNavigate   } from 'react-router-dom';

// كمبونت عدم العثور على المسار
export default function Page404() {
    const buttonStyle: React.CSSProperties = { // تحديد نوع الكائن
        color: 'white',
        backgroundColor: '#DB4444',
        padding: '15px',

    };
    const navigate = useNavigate()

    return (
        <div>
            <Header />
            <div className='h-screen w-screen flex flex-row justify-center items-center  '>
                <div className=' text-center  w-1/2 h-1/2 space-y-14 p-14'>
                    <h1 className=' text-6xl'>الصفحة غير موجودة 404</h1>
                    <p>انت تحاول الوصول الى صفحة غير موجودة</p>
                    <div  className=' flex flex-row justify-center w-full bg-black'>
                        <Button type='submit' className=' w-full' onClick={()=>navigate("/home")} style={buttonStyle} variant='contained'>
                               رجوع الى الصفحة الرئيسية
                        </Button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

