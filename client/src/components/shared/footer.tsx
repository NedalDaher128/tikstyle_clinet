
export default function Footer() {
    return (
        <div id='footer' className=' grid grid-cols-3  justify-items-center	content-center	'>
            <div id='box_footer' className='flex flex-col text-white'>
                <h1>الدعم الفني</h1>
                <p>
                    عنوان شارع الجامعة
                </p>
                <p>test@gmail.com</p>
                <p>0797514430</p>
            </div>
            <div id='box_footer' className='flex flex-col text-white'>
                <h1>حساب</h1>
                <p>حسابي</p>
                <p>تسجيل الدخول / انشاء حساب</p>
                <p>عربة التسوق</p>
                <p>القائمة البيضاء</p>
            </div>
            <div id='box_footer' className='flex flex-col text-white'>
                <h1>روابط سريعة</h1>
                <p>سياسة الخصوصية</p>
                <p>شروط الاستخدام</p>
                <p>أسئلة متكررة</p>
                <p>تواصل معنا</p>
            </div>
        </div>
    )
}

