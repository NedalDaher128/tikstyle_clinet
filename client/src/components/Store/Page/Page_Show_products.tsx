import AxiosDataBase from "../../../Axios/AxiosDataBase";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from "../../shared/header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function ProductCard() {
  useEffect(() => {
    const GetDate = async () => {
      try {
        const respone = await AxiosDataBase.axiosLogin.get(`/product/get/${id}`)
        setproduct(respone.data.response)
      } catch (error) {
        console.log(error)
      }
    }
    GetDate();
  }, []);
  const [product, setproduct] = useState<any>({})
  console.log(product)
  const { id } = useParams()




  return (
    <>
      <Header />
      <div className="card-wrapper">
        <div className="card">
          {/* card left */}
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase ">
                {
                  product.images && Object.values(product.images).map((item: any) => (
                    <img className=" " src={item.linkimage} alt="shoe image" />
                  ))
                }
              </div>
            </div>
            <div className="img-select">
              {
                product.images && Object.values(product.images).map((item: any) => (
                  <div className="img-item w-1/5">
                    <a href="#" data-id="1">
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
                <li>الون:<span>{product.color ? `لون المنتج: ${product.color}` : "غير معروف"}</span></li>
                <li>الماركة: <span>{product.type}</span></li>
                <li>التصنيف: <span>{product.Category}</span></li>
                <li>توصل: <span>توصل جميع المحفظات</span></li>
                <li>سعر التوصيل: <span>حسب المنطقة</span></li>
              </ul>
            </div>

            <div className="flex items-center gap-6">
              <TextField
                type="number"
                inputProps={{ min: 0, max: 10 }}
              />
              <Button variant="contained" href="#contained-buttons">
                اضف الى عربة التسوق
              </Button>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
