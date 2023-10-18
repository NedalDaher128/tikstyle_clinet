import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { additem } from '../../../../redux/Silce/CartSilce';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AxiosDataBase from '../../../../Axios/AxiosDataBase';

function Filter_products() {
  const [data, setdata] = useState<any>({ type: '', Category: '' });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter.mark);
  const handleTypeChange = (event: any) => {
    setdata({ ...data, [event.target.name]: event.target.value });
  };
  const type = queryParams.get('type');
  const Category = queryParams.get('Category');
  const cart = useSelector((state: any) => state.cart.items);
  console.log(cart);
  const [products, setproducts] = useState<any[]>([]);
  // تحسين الأداء باستخدام useCallback
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
    const fetchData = async () => {
      try {
        let response;
        if (data.type !== '' && data.Category !== '') {
          response = await AxiosDataBase.axiosLogin.get(
            `/product?type=${data.type}&Category=${data.Category}`
          );
          console.log(1);
          setproducts(response.data.result);
        } else if (type !== null && Category === null) {
          response = await AxiosDataBase.axiosLogin.get(`/product?type=${type}`);
          console.log(2);
          setproducts(response.data.result);
        } else {
          response = await AxiosDataBase.axiosLogin.get(
            `/product?type=${'null'}&Category=${'null'}`
          );
          console.log(3);
          setproducts(response.data.result);
        }
        const result = response.data.result;
        setproducts(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // استدعاء الوظيفة المساعدة للحصول على البيانات
  }, [data]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 p-4'>
      <div className='lg:col-span-1 bg-white border-4 border-gray-300 p-4 rounded-lg'>
        <h1 className='text-3xl text-center mb-4 font-semibold'>فلترة المنتجات</h1>
        <div className='mb-6'>
          <h2 className='text-xl mb-2 font-semibold'>السعر</h2>
        </div>
        <div className='mb-6'>
          <h2 className='text-xl mb-2 font-semibold'>الماركة</h2>
          <TextField
            id='outlined-select-currency'
            select
            label='الماركة'
            value={data.type}
            name='type'
            onChange={handleTypeChange}
            className='w-full'
            variant='outlined'
          >
            {filter.map((option:any) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className='mb-6'>
          <h2 className='text-xl mb-2 font-semibold'>تصنيف المنتج</h2>
          <TextField
            select
            label='تصنيف المنتج'
            variant='outlined'
            value={data.Category}
            name='Category'
            onChange={handleTypeChange}
            className='w-full'
          >
            {data.type === 'Nike' || data.type === 'Converse' ? (
              filter.map((option:any) => (
                option.name === data.type ? (
                  option.Category.map((option:any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))
                ) : null
              ))
            ) : (
              <MenuItem key={data.type} value={data.type}>
                {data.type}
              </MenuItem>
            )}
          </TextField>
        </div>
      </div>
      <div className='lg:col-span-2  bg-white rounded-lg p-4'>
        <div id='responev-show-products' className='grid grid-cols-3 gap-5 s'>
          {products.map((shoe) => (
            shoe.images.map((image: any) => (
              <div className='effect_car flex flex-col items-center justify-center rounded-lg border-2 h-[400px] w-[250px]    '>
                <div className='flex flex-col items-center justify-center space-y-3'>
                  <img className='rounded-lg max-w-fit' src={`https://tikstyle-api.vercel.app${image.filename}`} alt='' />
                  <div className='flex flex-col justify-between w-full'>
                    <p className='text-2xl'>{shoe.name}</p>
                  </div>
                  <div className='flex flex-col justify-end items-end w-full'>
                    <p className='text-2xl'>سعر المنتج {shoe.price} JD</p>
                  </div>
                  <button onClick={() => addcartChange(shoe)}>اضافة المنتج الى العربة</button>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter_products;
