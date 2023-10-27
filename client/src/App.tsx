// ملف التصميم الذي يحتوي على معظم تصاميم الموقع
import './assets/CSS/App.css'
import "./assets/CSS/Admin.css"
import { lazy, Suspense } from 'react';

// استدعاء صفحة تسجيل الدخول
import PageLogin from './page/PageLogin'
// صفحة انشاء الحساب
import PageRegister from './page/PageRegister'
// مكتبة ريكات تسمح بأنشاء مسارات في الموقع
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// حماية مسار تسجيل الدخول وانشاء الحساب من دخول عليها بعد تسجيل في الموقع
import ProtectedRouter from "./components/Admin/ProtectedLoginRegister"
// كود وظيفته حماية صفحة ادارة الموقع من المخترقين
import ProtectedLoginAdmin from "./components/Admin/ProtectedLoginAdmin"
// صفحة عدم العثور على الصفحة  404 
import Page404 from './page/Page404';
// كود وظيفته منع الدخول الى المتجر بعد تعذر تسجيل الدخول
import ProtectedStore from "./components/Admin/ProtectedStore"
// مكتبة ارسال الطلبات
import AxiosDataBase from './Axios/AxiosDataBase';
// مكتبة تخزين البيانات في الكوكيز
import  Cookie  from 'js-cookie';

// صفحة اضافة المنتجات
const PageAddProduct = lazy(() => import('./components/Admin/page/PageAddProducts'));
const PageListProducts = lazy(() => import('./components/Admin/page/PageListProducts'));
const PageListUsers = lazy(() => import('./components/Admin/page/PageListUsers'));
const PageListCoupons = lazy(() => import('./components/Admin/page/PageListCoupons'));
const HomePageAdmin = lazy(()=> import('./components/Admin/page/HomePageAdmin'))
const ProtectedDashBord = lazy(()=> import('./components/Admin/components/ProtectedDashBord'))
// globalsytle
import GlobalStyle from './assets/CSS/GlobalStyles';

// الأموار الخاصة للصفحة اليوزر
import Home from './components/Store/Page/PageHomeStore';
import FilterProducts from './components/Store/Page/PageFilterProducts';
import PageOrder from './components/Store/Page/PageOrder';
import PageShowitem from "./components/Store/Page/Page_Show_products"

import RTL from './RTL';
document.dir = 'rtl';




export default function App() {
  // تخزين البيانات في الكوكيز
  const cookies  =  Cookie;
  // اعادة التوجيه
  // refresh token
  setInterval(() => {
    // use axios
    try {
      const token = cookies.get("tokenAdmin");
      if (!token) {
        return;
      }
      if (token) {
        AxiosDataBase.axiosAdmin.post("/refreshToken", { token: token }).then((res) => {
          cookies.set("tokenAdmin", res.data.token, { path: "/" })
        }).catch((err) => {
          console.log(err);
        })
      }
    } catch (error) {

    }
  }, 1000 * 60 * 60 * 24);

    return (
      <RTL>
        <div className=' w-screen h-screen '>
          <BrowserRouter>
            <GlobalStyle />
            <Routes>
              <Route path='*' element={<Page404 />} />
              <Route element={<ProtectedRouter />}>
                <Route path='/login' element={<PageLogin />} />
                <Route path='/register' element={<PageRegister />} />
              </Route>
              <Route path='/' element={<Home />} />
              <Route element={<ProtectedStore />}>
                <Route path='/Products' element={<FilterProducts />} />
                <Route path='/order' element={<PageOrder />} />
                <Route path='/product/:id' element={<PageShowitem/>} />
              </Route>
              <Route path='/admin/:variable?' element={<ProtectedLoginAdmin />} />
              <Route element={<Suspense fallback={<h1>جاري تحميل الصفحة</h1>}>
                <ProtectedDashBord />
              </Suspense>}>
                <Route path='/admin/dashboard' element={<HomePageAdmin />} />
                <Route path='/admin/products/add' element={<PageAddProduct />} />
                <Route path='/admin/products/list' element={<PageListProducts />} />
                <Route path='/admin/customers' element={<PageListUsers />} />
                <Route path='/admin/coupons' element={<PageListCoupons />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </RTL>
    )
}

