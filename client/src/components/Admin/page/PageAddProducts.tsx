import HeaderAdmin from '../components/headerAdmin'
import AddProducts from '../components/add_products'
export default function DashBord() {
  return (
    <div className='flex flex-row bg-gray-200'>
      <HeaderAdmin />
      <AddProducts />
    </div>
  )
}
