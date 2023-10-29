import HeaderAdmin from '../components/headerAdmin'
import ListUsers from '../components/get_users'
export default function PageListUsers() {
    return (
        <div className='flex flex-row '>
                <HeaderAdmin />
                <ListUsers/>
        </div>
    )
}
