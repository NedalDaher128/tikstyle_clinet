import { useState, useEffect, useCallback } from 'react';
import AxiosDataBase from '../../../../Axios/AxiosDataBase';
import { useSelector, useDispatch } from 'react-redux';
import { additem  } from '../../../../redux/Silce/CartSilce';

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


  useEffect(() => {
    get_shoes()
    console.log(shoes)

  }, [])
  return (


    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-items-center content-center'>
      {shoes.map((shoe) => (
        <div key={shoe.mainImage} className='effect_car flex flex-col items-center justify-center rounded-lg border-2  h-[400px] w-[250px] transition-all    '>
        <div className='flex flex-col items-center justify-center space-y-3'>
          <img className='rounded-lg max-w-fit' src={`http://localhost:3001${shoe.mainImage}`} alt="" />
          <div className='flex flex-col justify-between w-full'>
            <p className='text-2xl'>{shoe.name}</p>
          </div>
          <div className='flex flex-col justify-end items-center   w-full'>
            <p className='text-2xl'>سعر المنتج {shoe.price} JD</p>
            <button onClick={() => addcartChange(shoe)}>اضافة المنتج الى العربة</button>  
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default show_products