import HeaderAdmin from '../components/headerAdmin'
import ListCoupons from '../components/get_coupon'
function PageListCoupons() {
    return (
        <div className='flex flex-row'>
                        <HeaderAdmin />
            <ListCoupons />
        </div>
    )
}

export default PageListCoupons