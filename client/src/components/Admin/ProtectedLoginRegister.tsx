// لمعرفة كيف تعمل طريقة حماية الوحة راجع الدليل البرمجي للمشروع
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AxiosDataBase from '../../Axios/AxiosDataBase';
// تعريق نوقع بيانات
type condition = boolean | null | string

// كمبونت مسوؤل عن منع الوصول الى صفحة تسجيل الدخول وانشاء الحساب بعد التسجيل في الموقع
const PrivateRoutes = () => {
    const [cookies] = useCookies(['tokenUser']);
    const cookieValue = cookies.tokenUser;
    const [isPermitted, setIsPermitted] = useState<condition>(null);
    useEffect(() => {
        const checkSession = async () => {
            try {
                if(cookieValue){
                    const response = await AxiosDataBase.axiosLogin.post("/check_token", {}, {
                        headers:{
                            "Authorization": `Bearer ${cookieValue}`
                        }
                    });
                    if(response.data.result){
                        setIsPermitted(false);
                    }
                }else{
                    setIsPermitted(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        checkSession();
    }, []);

    if (isPermitted === null) {
        // لا تعرض شيئًا أثناء انتظار البيانات
        return null;
    }

    return isPermitted ? <Outlet /> : <Navigate to='/home' />;
};

export default PrivateRoutes;