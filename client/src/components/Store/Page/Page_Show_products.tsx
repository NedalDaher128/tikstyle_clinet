
import AxiosDataBase from "../../../Axios/AxiosDataBase";
import { ChangeEvent } from "react"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from "../../shared/header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { additem } from '../../../redux/Silce/CartSilce';
import MenuItem from '@mui/material/MenuItem';

function ProductCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // حالة لتتبع الصورة الحالية
  const [product, setproduct] = useState<any>({})
  const images = product.images || [];
  console.log(images)
  const [size, setsize] = useState<[]>([])
  const [data, setData] = useState<any>({ size: "" })
  const { id } = useParams()
  const dispatch = useDispatch();
  const addcartChange = () => {
    try {
      const modifiedProduct = { ...product, count: 1, size: data.size,color:images[currentImageIndex].color };
      const existingProduct = JSON.parse(localStorage.getItem("cart") || "[]");

      if (existingProduct.length === 0) {
        localStorage.setItem("cart", JSON.stringify([modifiedProduct]));
      } else {
        const foundItem = existingProduct.find((item: any) =>
          item.size === modifiedProduct.size && item._id === modifiedProduct._id
        );

        if (!foundItem) {
          existingProduct.push(modifiedProduct);
        } else {
          foundItem.count++;
        }

        localStorage.setItem("cart", JSON.stringify(existingProduct));
      }

      dispatch(additem(modifiedProduct));
    } catch (error) {
      console.error("An error occurred while updating the cart:", error);
    }
  };
  ;
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  
  useEffect(() => {
    const GetDate = async () => {
      try {
        const respone = await AxiosDataBase.axiosLogin.get(`/product/get/${id}`)
        setproduct(respone.data.response)
        if (respone.data.response.size) {
          setsize(JSON.parse(respone.data.response.size))
        }
      } catch (error) {
        console.log(error)
      }
    }
    GetDate();
  }, []);

  return (
    <>
      <Header />
      <div className="card-wrapper">
        <div className="card">
          {/* card left */}
          <div className="product-imgs">
            <div className="img-display">
              {
                product.mainImage && (
                  <div className="img-showcase ">
                    <img className="" src={images[currentImageIndex].linkimage} alt="shoe image" />
                  </div>
                )
              }
            </div>
            <div className="img-select">

              {
                product.images && Object.values(product.images).map((item: any, index: any) => (
                  <div key={index} className="img-item w-1/5">
                    <a href="#" data-id={index} onClick={() => setCurrentImageIndex(index)}>
                      <img src={item.linkimage} alt="shoe image" />
                    </a>
                  </div>

                ))
              }
            </div>
          </div>
          {/* card right */}
          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>
            <a href="#" className="product-link">visit nike store</a>


            <div className="product-price">
              <p className="last-price">السعر القديم: <span>JD{parseInt(product.price) + 10}</span></p>
              <p className="new-price">السعر الجديد: <span>JD{parseInt(product.price) - 10 + 10}</span></p>
            </div>

            <div className="product-detail">
              <h2>المزيد عن المنتج: </h2>
              <p>الأحذية هي جزء أساسي من حياتنا اليومية، وتلعب دورًا هامًا في تعزيز راحتنا وأناقتنا. في متجرنا، نولي أهمية كبيرة لجودة الأحذية وتصنيعها. نهدف إلى تقديم منتجات عالية الجودة تلبي احتياجات عملائنا وتضمن لهم الراحة والمتانة.</p>
              <p>نحرص على استخدام أفضل الخامات والمواد في تصنيع أحذيتنا. نقوم بانتقاء الجلود والأقمشة بعناية فائقة لضمان تحقيق أعلى مستويات الجودة. كما نسعى دائمًا لتطبيق أحدث التقنيات والتكنولوجيا في صناعة الأحذية لضمان الأداء الأمثل والمتانة.</p>
              <ul>
                <li>الون:<span>{product.price ? `${images[currentImageIndex].color}` : "غير معروف"}</span></li>
                <li>الماركة: <span>{product.type}</span></li>
                <li>التصنيف: <span>{product.Category}</span></li>
                <li>توصيل : لجميع محافاظات الممكلة</li>
                <li>سعر التوصيل: <span>حسب المنطقة</span></li>
              </ul>
            </div>

            <div className="flex items-center gap-6">

              <Button onClick={addcartChange} variant="contained" sx={{
                bgcolor: "red"
              }} href="#contained-buttons">
                اضف الى عربة التسوق
              </Button>
              <TextField
                id='outlined-select-currency'
                select
                label='المقاس'
                value={data.size}
                name='size' // يجب أن يتماثل الاسم مع القيمة في `data` لكي يتم تحديثها بشكل صحيح
                onChange={handleTypeChange}
                className='w-1/3'
                variant='outlined'
              >
                {
                  size.map((sizeOption, index) => (
                    <MenuItem key={index} value={sizeOption}>
                      {sizeOption}
                    </MenuItem>
                  ))
                }
              </TextField>

            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
