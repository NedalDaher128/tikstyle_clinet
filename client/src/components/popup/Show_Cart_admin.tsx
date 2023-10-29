
export default function Show_Cart_admin(props: any) {
    return props.trigger ? (
        <div className="overflow">
            <div className='show_image flex relative flex-col justify-between items-center overflow-hidden'>
                <p className='text-3xl'>عربة التسوق الخاص للعميل</p>
                <button className='absolute top-5 right-5 text-3xl' onClick={() => {
                    props.setTrigger(false)
                }}>X</button>
                    {
                         <div className="flex flex-row flex-wrap  justify-around items-center w-full h-full ">
                         {props.rowData.map((item: any, index: number) => (
                           <div
                             key={index}
                             className="flex flex-row justify-between bg-gray-100 rounded p-2 mb-2"
                           >
                             <div>
                               <p>
                                 <strong>نوع المنتج:</strong> {item.type}
                               </p>
                               <p>
                                 <strong>تصنيف المنتج:</strong> {item.Category}
                               </p>
                               <p>
                                 <strong>لون المنتج:</strong> {item.color}
                               </p>
                               <p>
                                 <strong>سعر القطعة الواحدة:</strong> {item.price}
                               </p>
                               <p>
                                 <strong>المقاس المطلوب:</strong> {item.size}
                               </p>
                               <p>
                                 <strong>الكمية المطلوبة:</strong> {item.count}
                               </p>
                             </div>
                           </div>
                         ))}
                       </div>
                    }
                </div>
            </div>
    ) : null;

}
