import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'; // استيراد Box من Mui بدلاً من div
import AxiosDataBase from '../../../../Axios/AxiosDataBase';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify'; // مكتبة لعرض رسائل سريعة
import { show_message } from '../../../shared/messagepouporder'; // استدعاء الرسالة التي ستظهر
import { useNavigate } from 'react-router-dom';
export default function Order() {
  const nagtive = useNavigate()
  const [totalPrice, setTotalPrice] = useState<string | null>(null);
  const [total, setTotal] = useState<string | null>(null);
  const [cookies] = useCookies(['tokenUser']);
  const cookieValue = cookies.tokenUser;
  const [data, setData] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    price: 0,
    coupon: "",
    cart: useSelector((state: any) => state.cart.items),
    deliveryPrice: 0,
    status: "التجهيز"
  });
  const getid = async () => {
    try {
      const response = await AxiosDataBase.axiosLogin.post("/check_token", {}, {
        headers: {
          "Authorization": `Bearer ${cookieValue}`
        }
      });
      if (response.data.result) {
        setData((prevValueForm) => ({
          ...prevValueForm,
          id: response.data.token.id,
        }));
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const submitorder = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(1)
    try {
      const response = await AxiosDataBase.axiosLogin.post("/order/add", data);
      if (response.data.result) {
        show_message()
        setTimeout(function () {
          localStorage.clear();
          nagtive("/")
        }, 2000); // 2000 مللي ثانية تعادل ثانيتين
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getid()
    setTotalPrice(localStorage.getItem("price"));
    setTotal(localStorage.getItem("total"));
    setData((prevValueForm) => ({
      ...prevValueForm,
      price: parseInt(localStorage.getItem("price") || '0'),
    }));
  }, []);

  const jordanGovernorates = [
    {
      name: " (العاصمة) عمان",
      deliveryPrice: 2,
    },
    {
      name: "اربد",
      deliveryPrice: 3,
    },
    {
      name: "الزرقاء",
      deliveryPrice: 3,
    },
    {
      name: "البلقاء",
      deliveryPrice: 3,
    },
    {
      name: "مادبا",
      deliveryPrice: 3,
    },
    {
      name: "الكرك",
      deliveryPrice: 3,
    },
    {
      name: "الطفيلة",
      deliveryPrice: 3,
    },
    {
      name: "معان",
      deliveryPrice: 3,
    },
    {
      name: "العقبة",
      deliveryPrice: 3,
    },
    {
      name: "المفرق",
      deliveryPrice: 3,
    },
    {
      name: "جرش",
      deliveryPrice: 3,
    },
    {
      name: "عجلون",
      deliveryPrice: 3,
    },
    {
      name: "الكرامة",
      deliveryPrice: 3,
    },
    {
      name: "الطرة",
      deliveryPrice: 3,
    },
  ];
  const buttonStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#DB4444',
    padding: '15px',
};
  const handlesetdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "city") {
      const finditems = jordanGovernorates.find((item) => item.name === value);
      setData((prevValueForm) => ({
        ...prevValueForm,
        [name]: value,
        deliveryPrice: finditems ? finditems.deliveryPrice : 0
      }));
      setData((prevValueForm) => ({
        ...prevValueForm,
        price: parseInt(localStorage.getItem("price") || '0') + (finditems ? finditems.deliveryPrice : 0),
      }));
    } else {
      setData((prevValueForm) => ({
        ...prevValueForm,
        [name]: value,
      }));
    }
  }

  const handleusecoupon = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await AxiosDataBase.axiosLogin.post("/use_coupon", {
        coupon: data.coupon,
      });
      if (response.data.result) {
        setTotalPrice((parseInt(totalPrice || '0') - parseInt(response.data.use.rate)).toString());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{
      gridTemplateColumns: {
        xl: 'repeat(2, 1fr)',
        md: 'repeat(2, 1fr)',
        sm: 'repeat(1, 1fr)',
        xs: 'repeat(1, 1fr)',
      }
    }} className='grid grid-cols-2 mt-10 ml-20 mr-20 '>
      <h1 className='col-span-2'>ارسال طلب</h1>
      {parseInt(total || '0') > 0 ? (
        <>
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
          <Box
            className=' flex flex-col gap-5'
            sx={{
              gridColumn: {
                xl: '1/2',
                md: '1/2',
                sm: '1/1',
                xs: '1/1',
              }
            }} >
            <TextField
              onChange={handlesetdate}
              id="outlined-basic"
              name='name'
              label="اسمك"
              variant="outlined"
            />
            <TextField
              onChange={handlesetdate}
              id="outlined-basic"
              name='phone'
              label="رقم الهاتف"
              variant="outlined"
            />
            <TextField
              onChange={handlesetdate}
              id="outlined-basic"
              name='address'
              label="عنوان المنزل"
              variant="outlined"
            />
            <TextField
              id="outlined-select-currency"
              select
              name="city"
              value={data.city}
              label="المحافظة"
              defaultValue="JD"
              helperText="رجاء ادخال المحافظة"
              onChange={handlesetdate}
            >
              {jordanGovernorates.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={submitorder}
              className='col-span-3'
              href="#contained-buttons"
            >
              ارسال الطلب
            </Button>
          </Box>
          <Box
            className='  '
            sx={{
              gridColumn: {
                xl: '2/3',
                md: '2/3',
                sm: '1/1',
                xs: '1/1',
              },
              marginLeft: {
                xl: '100px',
                md: '100px',
                sm: '0px',
                xs: '0px',
              }
            }}>
            <p >وعليك أن تنتبه عند استخدام كود الخصم، عندما تقوم بالنقر على زر التطبيق، سيتم تنفيذ الخصم. في حال عدم ارسال الطلب، لا يمكنك استخدامه مرة أخرى.</p>
            <Box className=' flex flex-row '>
              <Box className='w-full'>
                <p>مجموع المنتجات {total}</p>
                <p>سعر المنتجات : JD {totalPrice}</p>
                <p>سعر التوصيل: JD {data.deliveryPrice}</p>
                <p>المجموع الكلي: JD {parseInt(totalPrice || '0') + data.deliveryPrice}</p>
              </Box>
              <Box className='space-x-10 space-y-5'>
                <TextField
                  onChange={handlesetdate}
                  id="outlined-basic"
                  name='coupon'
                  label="كود الخصم"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  style={buttonStyle}
                  onClick={handleusecoupon}
                  className='col-span-3'
                  href="#contained-buttons"
                >
                  تطبيق الكود
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <p>لاتوجد منتجات</p>
      )}
    </Box>
  );
}
