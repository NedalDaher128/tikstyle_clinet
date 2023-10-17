
export default function Footer() {
    return (
        <div id='footer' className=' grid grid-cols-3  justify-items-center	content-center	'>
            <div id='box_footer' className='flex flex-col text-white'>
                <h1>Support</h1>
                <p>
                    111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.
                </p>
                <p>test@gmail.com</p>
                <p>+88015-88888-9999</p>
            </div>
            <div id='box_footer' className='flex flex-col text-white'>
                <h1>Account</h1>
                <p>My Account</p>
                <p>Login / Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
            </div>
            <div id='box_footer' className='flex flex-col text-white'>
                <h1>Quick Link</h1>
                <p>Privacy Policy</p>
                <p>Terms Of Use</p>
                <p>FAQ</p>
                <p>Contact</p>
            </div>
            <div className=' col-span-3 mt-10'>
                <p className="text-gray-500"> © Copyright Rimel 2023. All right reserved</p>
            </div>
        </div>
    )
}

