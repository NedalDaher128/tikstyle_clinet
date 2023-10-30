import Header from '../components/shared/header'
import Login from '../components/Account/login'
import Footer from '../components/shared/footer'

export default function PageLogin() {
    return (
        // صفحة تسجيل الدخول
        <div className='flex flex-col  '>
            <Header />
            <Login />
            <Footer/>
        </div>

    )
}
