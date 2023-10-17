import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const show_message_error = () => {
    toast.error('عليك ملئ جميع الحقول او نسيت اضافة صورة', {
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
