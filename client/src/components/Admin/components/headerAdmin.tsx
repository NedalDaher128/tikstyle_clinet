import { useState } from 'react'; // استيراد useState من React
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faGauge, faShop, faUsers, faTicket, faCirclePlus, faCube, faGear, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/system';

function HeaderAdmin() {
    const [menuVisible, setMenuVisible] = useState(false); // حالة القائمة الرئيسية
    const cookies = new Cookie();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible); // تغيير حالة القائمة عند النقر على الأيقونة
    }

    const logout = () => {
        try {
            cookies.remove("tokenAdmin", { path: "/" });
            window.location.reload();
        } catch (error) {
            console.error(error);
            navigate("/home");
        }
    }

    const buttonStyle = {
        color: 'white',
        backgroundColor: '#DB4444',
        padding: '15px',
    };

    return (
            <>
            <div onClick={toggleMenu} className=" ">
            <FontAwesomeIcon
                icon={faBars}
                onClick={toggleMenu} // انقر لتبديل حالة القائمة
                style={{color:"red", fontSize: '24px', cursor: 'pointer ', position:"absolute", zIndex:"100", margin:"20px"}}
            />
            </div>
            {menuVisible && ( // عرض القائمة إذا كانت مرئية
            <Box sx={{
                position : {xs:"absolute" , md:"relative"},
                height :{xs:"80vh",md:"110vh"},
                width:{xs:"173px",md:"220px"}
                
            }} className= ' rounded-md relative z-50 w-[173px] p-10  h-full flex flex-col  ' style={{ backgroundColor: "#1E1E1E" }}>
            <ul className="flex flex-col space-y-5 mt-12 justify-center">
                        <p className=" text-gray-400">القائمة الرئيسية</p>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400 " icon={faGauge} />
                            <Link className="hover:text-red-400 transition-colors text-color_admin " to={"/admin/dashboard"}>لوحة القيادة</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faShop} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/orders"}>أدارة المنتجات</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faUsers} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/customers"}>العملاء</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faTicket} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/coupons"}>كود الخصم</Link>
                        </div>
                    </ul>
                    <ul className="flex flex-col space-y-5 mt-12">
                        <p className=" text-gray-400">المنتجات</p>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faCirclePlus} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/products/add"}>أضافة المنتجات</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faCube} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/products/list"}>قائمة المنتجات</Link>
                        </div>
                    </ul>
                    <ul className="flex flex-col space-y-5 mt-12">
                        <p className=" text-gray-400">الاعدادت</p>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faUser} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/manageAdmins"}>ادارة الحسابات</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-gray-400" icon={faGear} />
                            <Link className="transition-colors hover:text-red-400 text-color_admin " to={"/admin/adminRole"}>صلاحيات الادمن</Link>
                        </div>
                    </ul>
                    <Button onClick={logout} className=' w-36 h-5 relative top-5' style={buttonStyle} variant='contained'>تسجيل الخروج</Button>
            </Box>
            )}
            </>
    );
}

export default HeaderAdmin;
