import { lazy, Suspense } from 'react';
import { Box } from '@mui/material';

const Show_products = lazy(() => import('./assets/show_products'));
const Review_products = lazy(() => import('./assets/review_products'));
const Slider_image = lazy(() => import('./assets/slider_image'));

function home() {
  return (
    <Box id='box-product' sx={{
      gridTemplateRows: { xs: "repeat(1, 1fr)" },
    }} className='ml-10 mr-10 mt-5 grid grid-cols-2 grid-rows-4 justify-items-center content-between gap-20 border-4 border-red-500'>
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
        <Suspense fallback={<h1>جاري تحميل العنصر</h1>}>
          <Slider_image />
        </Suspense>
      </Box>
      {/* الصف الثاني */}
      <Box className='col-span-3 row-auto flex flex-col items-center'>
        <p className='text-4xl  '><span className=' mx-2 text-orange-600'>قائمة</span>المنتجات</p>
        <Suspense fallback={<h1>جاري تحميل العنصر</h1>}>
          <Show_products />
        </Suspense>
      </Box>

      {/* الصف الثالث */}
      <Box className='col-span-3 row-auto flex flex-col items-center'>
        <p className='text-4xl'>الأحذية <span className='text-orange-600'>الأكثر</span> شهرة</p>
        <Suspense fallback={<h1>جاري تحميل العنصر</h1>}>
          <Show_products />
        </Suspense>
      </Box>
      {/* الصف الخامس */}
      <Box className='col-span-3 row-auto flex flex-col items-center'>
        <p className='text-4xl'>أحذية قد <span className='text-orange-600'>تعجبك</span> ؟ </p>
        <Suspense fallback={<h1>جاري تحميل العنصر</h1>}>
          <Show_products />
        </Suspense>
      </Box>
      {/* الصف السادس */}
      <Box className='col-span-3 row-auto flex flex-col items-center '>
        <p className='text-4xl'>مراجعة <span className='text-orange-600'>للمنتج</span></p>
        <Suspense fallback={<h1>جاري تحميل العنصر</h1>}>
          <Review_products />
        </Suspense>
      </Box>
    </Box>
  )
}

export default home;
