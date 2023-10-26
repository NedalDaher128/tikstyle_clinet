import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageIcon from "../../assets/img/logo.png"
import Avatar from '@mui/material/Avatar';
import Menu_cart from '../popup/Menu_cart';
// ...
export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleCart, setIsVisibleCart] = useState(false);
  console.log(isVisibleCart);
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const StatusIconHeader = useSelector((state: any) => state.cart.StatusIconHeader);
  console.log(StatusIconHeader);
  return (
    <>
      {isVisibleCart ? <Menu_cart togle={isVisibleCart} setisVisibleCart={setIsVisibleCart} /> : null}
      <FontAwesomeIcon onClick={() => { toggleMenu() }} className={`hidden-menu absolute top-0 z-10 mx-10 my-10 hover:text-red-500 transition-all `} size='2xl' icon={faBars} />
      <div className={`${isVisible ? "flex" : "hidden"} header p-5 top-0 left-0 right-0 z-50 bg-white  flex items-center justify-around shadow-md`}>
        <Avatar src={ImageIcon} />
        <nav className="icons text-2xl flex flex-row  ">
          <span><Link to="/" className="text-1.5rem text-black mx-10 transition-all ">الصفحة الرئيسية</Link></span>
          <span><Link to="/Products" className="text-1.5rem text-black mx-10 transition-all">صفحة المنتجات</Link></span>
          <span><Link to="/support" className="text-1.5rem text-black mx-10 transition-all">دعم الفني</Link></span>
        </nav>
        <div className="icons">
          <span className='sub_icons'>
            <FontAwesomeIcon className='mx-4  hover:text-red-500 transition-all ' size='2xl' icon={faHeart} />
            <span>
              {StatusIconHeader.cart}
              <FontAwesomeIcon className='mx-4  hover:text-cyan-700 transition-all' size='2xl' onClick={() => setIsVisibleCart(true)} icon={faCartShopping} />
            </span>
            <FontAwesomeIcon className='mx-4  hover:text-blue-400 transition-all' size='2xl' icon={faUser} />
          </span>
        </div>
      </div>
    </>

  );
}
