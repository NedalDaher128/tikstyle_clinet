import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  Input } from 'semantic-ui-react';
import Menu_cart from '../popup/Menu_cart';

// ...
export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCart, setIsVisibleCart] = useState(false);
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const Status_Login = useSelector((state: any) => state.account.Status);
  console.log(Status_Login);
  const StatusIconHeader = useSelector((state: any) => state.cart.StatusIconHeader);
  const filter = useSelector((state: any) => state.filter.mark);
  const InputExampleIconProps = () => (
    <div dir='rtl' className='relative'>
      <Input
        placeholder='أشتري أفضل المنتجات من حول العالم'
        className='input_search w-96 flex flex-row items-center  '
      />
      <FontAwesomeIcon icon={faSearch} style={{ position: "absolute", top: "13px", left: "90%" }} />
    </div>
  );



  const grub_but = () => {
    return (
      <>
        <div className='grub_item_button  w-[250px] ' >
          <span className='flex w-1/2 flex-row  items-center  justify-around'>
            <FontAwesomeIcon onClick={() => setIsVisibleCart(true)} icon={faCartShopping} className='transition-all hover:text-blue-600' size="xl" />
            {StatusIconHeader.cart}
          </span>
          <FontAwesomeIcon size="xl" icon={faUser} />
        </div>
      </>
    )
  }

  return (
    <div dir='rtl' className='w-screen h-fit flex flex-col ' >
      {isVisibleCart ? <Menu_cart togle={isVisibleCart} setisVisibleCart={setIsVisibleCart} /> : null}
      <nav id='header' className='p-7 flex flex-row justify-around items-baseline '>
        <div id='box_title' className='flex flex-row justify-around'>
          <a href="/" className="  text-black"><h1 className='text-5xl '>Tik Style</h1></a>
          <FontAwesomeIcon className="hidden_element text-3xl" icon={faBars} onClick={toggleMenu} />
        </div>
        <ul className={`li_header text-xl ${isVisible ? "show_icon" : ""}`}>
          <li>{InputExampleIconProps()}</li>
          <div className="show_button_from_menu">
            {grub_but()}
          </div>
        </ul>
        <ul className='text-3xl flex flex-row justify-end items-center gap-6'>
          <div className={`${Status_Login ? "hidden" : "show_grub_icon_shop"} text-3xl flex flex-row justify-end items-center gap-6 `}>
            <Link className='text-xl text-black' to='/register'>تسجيل دخول / انشاء حساب</Link>
          </div>
          {grub_but()}
        </ul>
      </nav>
      <nav id='' className='p-7 flex flex-row justify-around items-baseline bg-gray-200 ' >
        <ul className='flex flex-row items-center  justify-around gap-3 w-full flex-wrap '>
          {
            filter.map((item: any) => {
              return (
                <a href={`/Products?type=${item.name}`}><li className='text-lg text-black hover:text-blue-600 cursor-pointer transition-all duration-500'>{item.name}</li></a>
              )
            })
          }
        </ul>
      </nav>
    </div>
  );
}
