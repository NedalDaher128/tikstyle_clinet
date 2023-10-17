import { useState, useEffect } from 'react'
import AxiosDataBase from '../../../Axios/AxiosDataBase'
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function ProtectedDashBord() {
  // حالة تحدث عند تحقق من البيانات
  const [isvilde, setIsVilde] = useState<boolean | null>(null)
  const cookies = new Cookies();
  const navigate = useNavigate();
  // تحقق من البيانات
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = cookies.get("tokenAdmin")
          if (token) {
          const respone = await AxiosDataBase.axiosAdmin.post("/checkToken", {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (respone.status === 200) {
            setIsVilde(true)
          }
          else {
            setIsVilde(false)
          }
        }
        if(!token){
          setIsVilde(false)
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkToken()

  }, [isvilde])
  if (isvilde === null) {
    // لا تعرض شيئًا أثناء انتظار البيانات
    navigate("/home")
    return null;
  }
  return isvilde ? <Outlet /> : <Navigate to='/home' />;

}
