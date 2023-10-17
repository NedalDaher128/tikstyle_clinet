import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const show_message_error = () => {
    toast.error('فشلت عملية تسجيل الدخول', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });


};
