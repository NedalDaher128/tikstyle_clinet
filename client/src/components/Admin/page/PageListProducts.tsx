import HeaderAdmin from '../components/headerAdmin'
import ListProducts from '../components/get_products'
export default function PageListProducts() {
  return (
    <div className='flex flex-row justify-between'>
      <div className='   w-fit h-screen'>
        <HeaderAdmin />
      </div>
      <ListProducts />
    </div> 
     )
}
