import { useState, useEffect } from 'react';
import { Box } from '@mui/material'; // أضفت Box هنا
//  useCallback,
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AxiosDataBase from '../../../../Axios/AxiosDataBase';
// import { useSelector, useDispatch } from 'react-redux';
// import { additem } from '../../../../redux/Silce/CartSilce';
function show_products() {
  // const dispatch = useDispatch();
  const [shoes, setshoes] = useState<any[]>([])
  // const cart = useSelector((state: any) => state.cart.items);
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
  // const addcartChange = useCallback((shoe: any) => {
  //   try {
  //     const modifiedProduct = { ...shoe, count: 1 };
  //     const existingProduct = JSON.parse(sessionStorage.getItem("cart") || "[]");
  //     if (existingProduct.length === 0) {
  //       sessionStorage.setItem("cart", JSON.stringify([modifiedProduct]));
  //       dispatch(additem(modifiedProduct));
  //       console.log(cart);

  //     } else if (existingProduct.length > 0) {
  //       const finditems = existingProduct.find((item: any) => item._id === shoe._id);
  //       if (!finditems) {
  //         existingProduct.push(modifiedProduct);
  //         sessionStorage.setItem("cart", JSON.stringify(existingProduct));
  //         dispatch(additem(modifiedProduct));
  //         console.log(cart);


  //       } else {
  //         finditems.count++;
  //         sessionStorage.setItem("cart", JSON.stringify(existingProduct));
  //         dispatch(additem(modifiedProduct));
  //         console.log(cart);

  //       }
  //     }

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [dispatch, additem, cart]);

  console.log(shoes)

  useEffect(() => {
    get_shoes()
    console.log(shoes)

  }, [])
  return (
    <Box
      sx={{
        display: { xs: 'grid', md: 'grid' },
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      }}
      className=' col-span-3  grid  grid-cols-3 gap-10 justify-items-center content-center'>
      {
        shoes.map((shoe: any) => (
          <Box key={shoe._id}
            sx={{
              width: { xs: '95%', md: '80%' },
            }}
            className='w-64 h-[360px] grid grid-cols-2 grid-rows-2 rounded-md bg-white shadow-xl '>
            <div className='iamge col-span-2 row-span-3 flex items-center justify-center w-full'>
              <img
                className="w-full h-[250px] rounded-t-md shadow-md transform scale-100 transition-transform hover:scale-110"
                src={`${shoe.mainImage}`}
                alt=""
              />
            </div>
            <div className=' relative top-10 col-span-2 flex flex-col justify-center items-end ml-5 h-1/2'>
              <p className='text-2xl text-center'>{shoe.name}</p>
              <p className='text-4xl text-center'>${shoe.price}</p>
            </div>
            <div className=' relative bottom-10 right-5 col-span-3 bg-red-600 w-10 h-8 flex justify-center items-center rounded-lg  cursor-pointer'>
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            </div>
          </Box>



        ))
      }
    </Box >
  )
}

export default show_products