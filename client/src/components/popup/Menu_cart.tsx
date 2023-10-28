import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {  removeitem } from '../../redux/Silce/CartSilce';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Menu_cart(props: any) {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  console.log(cart);


  return (
    <div className='overflowcart'>
      <div className='w-2/5  h-screen rounded-l-xl bg-white grid grid-cols-2  content-start    '>
        <FontAwesomeIcon className="text-5xl p-5 " icon={faX} onClick={() => props.setisVisibleCart(false)} />
        <div className=' col-span-2 flex flex-col items-center overflow-auto'>
          <h1 className="text-3xl text-center p-5">سلة المشتريات</h1>
          {cart.map((item: any) => (
            item.images.map(() => (
              <li id='menu_cart_responev' key={item._id} className="p-5 w-full flex gap-1 items-center justify-center space-x-4 border-b border-gray-300">
                <img
                  className=" w-1/5  space-y-5 h-20 rounded-md"
                  src={item.mainImage.linkimage}
                  alt={item.name}
                />
                <div id='menu_grub_cart' className="flex flex-row gap-5 ">
                  <div className="flex flex-row items-center w-full  space-x-5">
                    <span className="text-lg">أسم المنتج : {item.name}</span>
                  </div>
                  <div className="flex flex-row items-center space-x-5">
                    <span className="text-lg">الكمية: </span>
                    <span className="text-lg">{item.count}</span>
                  </div>
                  <div className="flex flex-row items-center space-x-5">
                    <span className="text-lg">{item.price}$</span>
                  </div>
                </div>

                <Button className='mt-10' onClick={() => dispatch(removeitem(item))} variant="contained"> حذف</Button>

              </li>
            ))
          ))}
          <Link className=' m-10 ml-14' to={'/order'}>
            <Button className=' m-20' variant="contained">دفع الان</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
