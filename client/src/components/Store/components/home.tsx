import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faHandshakeAngle, faStore } from '@fortawesome/free-solid-svg-icons';
import {  Box } from '@mui/material'; // أضفت Box هنا
import Image from '../../../assets/img/HomeStore/صورة 1.png'
import Image2 from '../../../assets/img/HomeStore/background.png'
import Image3 from '../../../assets/img/HomeStore/background2.png'
import Image4 from '../../../assets/img/HomeStore/background3.png'
import AxiosDataBase from '../../../Axios/AxiosDataBase';
import Show_products from './assets/show_products';

function home() {
    const [shoes, setshoes] = useState<any[]>([])
    console.log(shoes)
    const get_shoes = async () => {
        try {
            const response = await AxiosDataBase.axiosLogin.get("get_prodeuct", {
                params: {
                    page: 1,
                    limit: 10,
                    type: 'homestore'
                }
            })
            console.log(response.data.product)
            setshoes(response.data.product)

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        get_shoes()
    }, [])
    return (
        <Box id='box-product' className='ml-14 mr-14 mt-20 grid grid-cols-2 grid-rows-6 justify-items-center content-between gap-20'>
        {/* الصف الأول */}
        <Box
        className='col-span-3  flex flex-row justify-center items-center'
        sx={{
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            
            width: '100%',
            height: 'auto',
            
        }}
        >
          <Box>
            <p className='text-4xl'>متجر الكتروني لبيع الاحذية الفاخرة في عمان وجميع محافظات الممكلة الهاشمية</p>
          </Box>
          <Box  sx={{ width: '100%', height: 'auto' , maxWidth:"80%", minWidth:"60%" }}>
            <img src={Image} alt="" />
          </Box>
        </Box>
      
        {/* الصف الثاني */}
        <Box id='box-features-home' className='col-span-3 w-full flex flex-row justify-around items-center'>
          <Box>
            <Box className='flex flex-row justify-center items-center'>
              <FontAwesomeIcon className='text-4xl text-yellow-500' icon={faBoltLightning} />
              <p className='text-4xl'>توصيل سريع</p>
            </Box>
            <p className='text-center'>توصيل سريع لجميع محافظات الممكلة</p>
          </Box>
          <Box>
            <Box className='flex flex-row justify-center items-center'>
              <FontAwesomeIcon className='text-4xl text-yellow-500' icon={faHandshakeAngle} />
              <p className='text-4xl'>ضمان الجودة</p>
            </Box>
            <p className='text-center'>ضمان الجودة لجميع المنتجات</p>
          </Box>
          <Box>
            <Box className='flex flex-row justify-center items-center'>
              <FontAwesomeIcon className='text-4xl text-yellow-500' icon={faStore} />
              <p className='text-4xl'>تجربة مميزة</p>
            </Box>
            <p className='text-center'>تجربة مميزة للتسوق</p>
          </Box>
        </Box>
      
        {/* الصف الثالث */}
        <Box className='col-span-3 row-auto flex flex-col items-center'>
          <p className='text-4xl'>الأحذية الأكثر مبيعًا</p>
          <Show_products />
        </Box>
      
        {/* الصف الرابع */}
        <Box className='col-span-3  w-full h-96 '>
          <img src={Image2} className='w-screen flex' alt="" />
        </Box>
      
        {/* الصف الخامس */}
        <Box className='col-span-3 row-auto flex flex-col items-center'>
          <p className='text-4xl'>الأحذية الأكثر شهرة</p>
          <Show_products />
        </Box>
      
        {/* الصف السادس */}
        <Box className='col-span-3 row-auto pt-40 flex flex-row justify-around items-center'>
          <img src={Image3} className='w-2/5' alt="" />
          <img src={Image4} className='w-2/5 ' alt="" />
        </Box>
      </Box>
      
    )
}

export default home;
