// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBoltLightning, faHandshakeAngle, faStore } from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material'; // أضفت Box هنا
import Show_products from './assets/show_products';
import Slider_image from './assets/slider_image';
import Review_products from './assets/review_products';
function home() {

  return (
    <Box id='box-product' sx={{
      gridTemplateRows: { xs: "repeat(1, 1fr)" },

    }} className='ml-14 mr-14 mt-20 grid grid-cols-2 grid-rows-4 justify-items-center content-between gap-20'>
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
        <Slider_image />
      </Box>
      {/* الصف الثاني */}
      <Box className='col-span-3 row-auto flex flex-col items-center'>
        <p className='text-4xl  '><span className=' mx-2 text-orange-600'>قائمة</span>المنتجات</p>
        <Show_products />
      </Box>

      {/* الصف الثالث */}
      <Box className='col-span-3 row-auto flex flex-col items-center'>
        <p className='text-4xl'>الأحذية <span className='text-orange-600'>الأكثر</span> شهرة</p>
        <Show_products />
      </Box>
      {/* الصف الخامس */}
      <Box className='col-span-3 row-auto flex flex-col items-center'>
        <p className='text-4xl'>أحذية قد <span className='text-orange-600'>تعجبك</span> ؟ </p>
        <Show_products />
      </Box>
      {/* الصف السادس */}
      <Box className='col-span-3 row-auto flex flex-col items-center '>
        <p className='text-4xl'>مراجعة <span className='text-orange-600'>للمنتج</span></p>
        <Review_products />
      </Box>
    </Box>

  )
}

export default home;
