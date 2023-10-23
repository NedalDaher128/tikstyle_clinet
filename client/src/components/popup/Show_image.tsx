import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';

function Show_image(props: any) {
    const image = JSON.parse(sessionStorage.getItem('datafile') || '[]');
    console.log(image);
    const imagecopy =  image.map((item: any) => {
        return {
            name: item.name,
            color: item.color
        };
    });

    const [show_image, setShowImage] = useState({ url: "", name: "", indexArry: -1 });

    const setimage = (e: any) => {
        const index = e.target.getAttribute('data-index');
        const filename = e.target.getAttribute('data-filename');
        const src = e.target.getAttribute('src');

        setShowImage({ url: src, name: filename, indexArry: index });
    };

    const saveColor = (color: string) => {
        const index = show_image.indexArry;
        console.log(imagecopy);
        if (index !== -1) {
            image[index].color = color;
            sessionStorage.setItem('datafile', JSON.stringify(image));
            console.log(image);
        }
    };

    const setcolor = (e: any) => {
        const { value } = e.target;
        saveColor(value);
    };

    useEffect(() => {
        console.log(imagecopy);
    }, [imagecopy]);

    return props.trigger ? (
        <div className="overflow">
            <div className='show_image flex relative flex-col justify-between items-center overflow-hidden'>
                <p className='text-3xl'>معرض الصور</p>
                <button className='absolute top-5 right-5 text-3xl' onClick={() => {
                    props.setTrigger(false)
                }}>X</button>
                <div className='flex flex-row w-full h-full justify-between '>
                    <div className=' w-1/4 h-full overflow-y-auto overflow-hidden' style={{ direction: 'rtl' }}>
                        {
                            image.map((item: any, index: any) => {
                                return (
                                    <div key={index}  className='flex flex-col items-center gap-5'>
                                        <img onClick={setimage} key={index} src={item.url} data-filename={item.name} data-index={index}  className='rounded-xl w-40 h-40 mt-10' />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className=' w-1/2 h-full flex flex-col justify-center items-center   '>
                        <img className=' h-3/5' src={show_image.url} />
                    </div>
                    <div className=' w-4/12  h-full flex flex-col justify-center items-center    '>
                        <TextField id="outlined-basic"   onChange={setcolor} label="لون صورة" variant="outlined" />
                        <p className='text-3xl mt-10'>{image[show_image.indexArry] ? image[show_image.indexArry].color :"لايوجد لون"}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default Show_image;
