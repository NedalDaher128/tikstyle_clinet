import AxiosDataBase from "../../../../Axios/AxiosDataBase"
import { useState, useEffect } from "react"

interface Product {
    _id: string,
    name: string,
    price: string,
    type: string,
    Category: string,
    quantity: number,
    images: [],
    mainImage: {
        linkimage: string,
        filename: string,
        color: string
    }
}

function review_products() {
    const [product, setproduct] = useState<any>([]);
    console.log(product);
    const get_product = async () => {
        try {
            const response = await AxiosDataBase.axiosLogin.get("/get_prodeuct", {
                params: {
                    page: 1,
                    limit: 2,
                    type: 'homestore'
                }
            })
            setproduct(response.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        get_product();
    }, []); // استخدم مصفوفة تابعية فارغة للتنفيذ مرة واحدة عند تحميل المكون

    return (
        <section className="featured" id="fearured">
         {
            product.map((item:any)=>(
                <div className="product-container">
                <div className="row">
                  <div className="image-container">
                    <div className="small-image">
                        {
                            item.images.map((img:any)=>(
                                <img src={img.linkimage} alt="Product 1" className="featured-image-1" />
                            ))
                        }
                    </div>
                    <div className="big-image">
                      <img src={item.mainImage.linkimage} alt="Product 1" className="big-image-1" />
                    </div>
                  </div>
                  <div className="content">
                    <h3>{item.name}</h3>
                    <p>
                    في عالم الموضة والأناقة، نحن فخورون بتقديم أحذية عالية الجودة التي تجمع بين الأناقة والراحة بأفضل الطرق. نحرص دائمًا على توفير منتجات تلبي أعلى معايير الجودة والتصميم.
                    </p>
                    <div className="price">JD{parseInt(item.price)-10+10} <span>JD{parseInt(item.price)+10}</span></div>
                    <a href="#" className="btn">مراجعة المنتج</a>
                  </div>
                </div>
              </div>
            ))
         }
        </section>
      );
    

}

export default review_products;
