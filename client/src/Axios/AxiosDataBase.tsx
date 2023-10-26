// استدعاء مكتبة مسؤولة عن طلبات السيرفر
import axios from 'axios';


// قاعدة ملعومات حسابات المستخدمين 
const axiosLogin = axios.create({
    // رابط الارسال
    baseURL: "http://localhost:3001/api",
    headers: {
        "Content-Type": 'application/json'
    }
});
//  baseURL: "https://api.tikstyle-shop.com/api",

// قاعدة حسابات الادمن
const axiosAdmin = axios.create({
    // رابط الارسال
    baseURL: "http://localhost:3001/admin",
    headers: {
        "Content-Type": 'application/json',
    }
})
//"https://api.tikstyle-shop.com/admin"
// ردة فعل تحدث عند تنفيذ طلب
axiosAdmin.interceptors.response.use(
    (response) => {
        // شرط بحالة نجاح  الطلب طباعة معلومات الطلب
        if (response.status === 201) {
            console.log(response.data);
        }
        return response;
    },
    (error) => {
        // طباعة اخطاء عند فشل الطلب
        console.log(error)
        return Promise.reject(error);
    }
)
// ردة فعل تحدث عند تنفيذ طلب

axiosLogin.interceptors.response.use(
    (response) => {
        // شرط بحالة نجاح  الطلب طباعة معلومات الطلب
        if (response.status === 201) {
            console.log(response.data);
        }
        return response;
    },
    (error) => {
        // طباعة اخطاء عند فشل الطلب
        console.log(error)
        return Promise.reject(error);
    }
);

// تصدير الطلبات
export default { axiosLogin, axiosAdmin };
