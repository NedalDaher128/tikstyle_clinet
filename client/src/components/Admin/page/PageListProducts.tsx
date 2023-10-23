import HeaderAdmin from '../components/headerAdmin'
import ListProducts from '../components/get_products'
export default function PageListProducts() {
  return (
    <div className='flex flex-row' >

      <HeaderAdmin />
      <ListProducts />
    </div> 
     )
}
