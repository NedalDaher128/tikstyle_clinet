import { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { show_message_error } from '../shared/MessagErrorLogin';
import { setfilename, setstatuspopup } from "../../redux/Silce/FilterSilce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import AxiosDataBase from '../../Axios/AxiosDataBase';

function ShowImage(props: any): JSX.Element | null {
    const image = JSON.parse(sessionStorage.getItem('datafile') as string);
    const dispatch = useDispatch();
    const [imageup, setImage] = useState<any>([]);
    const id = useSelector((state: any) => state.actionstabel.Idrow);
    console.log(imageup);
    const [showImage, setShowImage] = useState({ url: '', name: '', indexArry: -1 });
    const [showImageInput, setShowImageInput] = useState(!image); // تم إضافة هذا الحالة

    const setimage = (e: any) => {
        const index = e.target.getAttribute('data-index');
        const filename = e.target.getAttribute('data-filename');
        const src = e.target.getAttribute('src');

        setShowImage({ url: src, name: filename, indexArry: index });
    };

    const saveColor = (color: string) => {
        const index = showImage.indexArry;
        console.log(image);
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

    const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);

            const fileData = fileArray.map((file: any) => {
                return {
                    name: file.name,
                    color: '',
                    url: URL.createObjectURL(file),
                };
            });
            console.log(fileData);
            dispatch(setfilename(fileData));
            setImage((prevData: any) => ({
                ...prevData,
                images: fileArray,
            }));
            setShowImageInput(false); // تم تغيير قيمة showImageInput لإخفاء حقل الإدخال
        }
    };
    const buttonStyle: React.CSSProperties = {
        color: 'white',
        backgroundColor: '#DB4444',
        padding: '15px',
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (image) {
                const formData = new FormData();
                formData.append('destination', JSON.stringify(image));
                console.log(imageup.images);
                imageup.images.forEach((image: any) => {
                    formData.append('images', image);

                });
                const res = await AxiosDataBase.axiosAdmin.put(`/image/update/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                sessionStorage.removeItem('datafile');
                console.log(res);
            } else {
                show_message_error();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return props.trigger ? (
        <div className='overflow'>
            {
                image ? (
                    <div className='show_image flex relative flex-col justify-between items-center overflow-hidden'>
                        <p className='text-3xl'>معرض الصور</p>
                        <button
                            className='absolute top-5 right-5 text-3xl'
                            onClick={() => {
                                dispatch(setstatuspopup(false));
                            }}
                        >
                            X
                        </button>
                        <div className='flex flex-row w-full h-full justify-between '>
                            <div className=' w-1/4 h-full overflow-y-auto overflow-hidden' style={{ direction: 'rtl' }}>
                                {image.map((item: any, index: any) => {
                                    return (
                                        <div key={index} className='flex flex-col items-center gap-5'>
                                            <img onClick={setimage} key={index} src={item.url} data-filename={item.name} data-index={index} className='rounded-xl w-40 h-40 mt-10' />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className=' w-1/2 h-full flex flex-col justify-center items-center   '>
                                <img className=' h-3/5' src={showImage.url} />
                            </div>
                            <div className=' w-4/12  h-full flex flex-col justify-center items-center    '>
                                <TextField id='outlined-basic' onChange={setcolor} label='لون صورة' variant='outlined' />
                                <p className='text-3xl mt-10'>{image[showImage.indexArry] ? image[showImage.indexArry].color : 'لايوجد لون'}</p>
                                <Button onClick={handleSubmit} className='h-5 relative top-5 p-5' style={buttonStyle} variant='contained'>
                                    تحديث الصورة
                                </Button>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='show_image flex relative flex-col justify-center items-center overflow-hidden'>
                        <div className='flex flex-col   space-x-2 space-y-10  justify-around items-center'>
                            {showImageInput && ( // تم إضافة هذا الشرط لعرض حقل الإدخال
                                <div>
                                    <input id='input-image' multiple type='file' onChange={imageChange} />
                                    <div className='flex flex-col items-center border-dashed border-2 p-5 border-sky-500'>
                                        <label htmlFor='input-image'>Upload Image</label>
                                        <FontAwesomeIcon icon={faUpload} />
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    ) : (
        null
    );
}

export default ShowImage;
