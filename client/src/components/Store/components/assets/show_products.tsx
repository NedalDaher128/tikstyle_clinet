import { useState, useEffect, useCallback } from 'react';
import AxiosDataBase from '../../../../Axios/AxiosDataBase';
import { useSelector, useDispatch } from 'react-redux';
import { additem } from '../../../../redux/Silce/CartSilce';

function show_products() {
  const dispatch = useDispatch();
  const [shoes, setshoes] = useState<any[]>([])
  const cart = useSelector((state: any) => state.cart.items);
  const get_shoes = async () => {
    try {
      const response = await AxiosDataBase.axiosLogin.get("/get_prodeuct", {
        params: {
          page: 1,
          limit: 10,
          type: 'homestore'
        }
      })
      console.log(response.data.result)
      setshoes(response.data.result)

    } catch (error) {
      console.log(error)
    }
  }
  const addcartChange = useCallback((shoe: any) => {
    try {
      const modifiedProduct = { ...shoe, count: 1 };
      const existingProduct = JSON.parse(sessionStorage.getItem("cart") || "[]");
      if (existingProduct.length === 0) {
        sessionStorage.setItem("cart", JSON.stringify([modifiedProduct]));
        dispatch(additem(modifiedProduct));
        console.log(cart);

      } else if (existingProduct.length > 0) {
        const finditems = existingProduct.find((item: any) => item._id === shoe._id);
        if (!finditems) {
          existingProduct.push(modifiedProduct);
          sessionStorage.setItem("cart", JSON.stringify(existingProduct));
          dispatch(additem(modifiedProduct));
          console.log(cart);


        } else {
          finditems.count++;
          sessionStorage.setItem("cart", JSON.stringify(existingProduct));
          dispatch(additem(modifiedProduct));
          console.log(cart);

        }
      }

    } catch (error) {
      console.error(error)
    }
  }, [dispatch, additem, cart]);
  console.log(shoes)

  useEffect(() => {
    get_shoes()
    console.log(shoes)

  }, [])
  return (
    <div className=' col-span-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-items-center content-center'>
      {
        shoes.map((shoe: any) => (
          <div key={shoe._id} className='w-60 h-96 flex flex-col justify-center items-center'>
            <div className='iamge'>
              <img src={`https://api.tikstyle-shop.com${shoe.mainImage}`} alt="" />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default show_products