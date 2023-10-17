import  { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';

import AxiosDataBase from '../../Axios/AxiosDataBase';

function ProtectedStore() {
    const [cookies] = useCookies(['tokenUser']);
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true); // حالة التحميل
    const cookieValue = cookies.tokenUser;
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await AxiosDataBase.axiosLogin.post("/check_token", {}, {
                    headers: {
                        "Authorization": `Bearer ${cookieValue}`
                    }
                });

                if (response.data.result) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                console.log(error);
                setIsAuth(false);
            } finally {
                setLoading(false); // انتهاء عملية التحميل بغض النظر عن النتيجة
            }
        };

        if (cookieValue) {
            checkToken();
        } else {
            setIsAuth(false);
            setLoading(false); // إذا لم يكن هناك توكن
        }
    }, [cookieValue]);

    if (loading) {
        return null; // يمكنك هنا عرض مؤشر تحميل
    }

    if (isAuth === true) {
        return <Outlet />;
    } else {
        navigate('/login'); // توجيه المستخدم إلى صفحة تسجيل الدخول
        return null; // يمكنك هنا عرض مؤشر تحميل أو رسالة إذا لزم الأمر
    }
}

export default ProtectedStore;
