import React, { useState, ChangeEvent } from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Show_image from '../../popup/Show_image';
import AxiosDataBase from '../../../Axios/AxiosDataBase';
import { setfilename } from '../../../redux/Silce/FilterSilce';
import { useDispatch } from 'react-redux';
import { show_message_error } from '../../shared/MessageErrorImg'
import { ToastContainer } from 'react-toastify';


interface ProductData {
    name: string;
    type: string;
    price: string;
    Category: string;
    quantity: string;
    images: File[];
}

interface ImageData {
    urls: string[];
}

export default function AddProducts() {
    const [data, setData] = useState<ProductData>({
        name: '',
        type: '',
        Category: '',
        price: '',
        quantity: '',
        images: [],
    });

    const dispatch = useDispatch();
    const FilterData = useSelector((state: any) => state.filter);
    const [State, setState] = useState(false);
    const [image] = useState<ImageData>({ urls: [] });
    const img = JSON.parse(sessionStorage.getItem('datafile') as string)

    const buttonStyle: React.CSSProperties = {
        color: 'white',
        backgroundColor: '#DB4444',
        padding: '15px',
    };

    const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'price' || name === 'quantity') {
            const checkValue = value.replace(/[^0-9]/g, '');
            setData((prevData) => ({
                ...prevData,
                [name]: checkValue,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    1

    const handleTypeChangeSel = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            type: event.target.value,
        });
    };

    const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files).map((file) => {
                const uniqueName = Date.now() + '_' + file.name; // إنشاء اسم جديد مع الوقت الحالي
                return new File([file], uniqueName, { type: file.type }); // إنشاء ملف جديد بالاسم الجديد
            });

            console.log(fileArray);
            const fileData = fileArray.map((file) => {
                return {
                    name: file.name,
                    color: '',
                    url: URL.createObjectURL(file)
                }
            });

            dispatch(setfilename(fileData))
            setData((prevData) => ({
                ...prevData,
                images: fileArray,
            }));
        }
    };



    const showButton = () => {
        if (data.images.length > 0) {
            return (
                <Button onClick={() => setState(true)} className='  h-5 relative top-5 p-5' style={buttonStyle} variant='contained'>تقييم الصورة واضافة الوان</Button>
            )
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (img) {
                console.log('true');
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('type', data.type);
                formData.append('price', data.price);
                formData.append('quantity', data.quantity);
                formData.append('Category', data.Category);
                formData.append('Description', JSON.stringify(img));
                data.images.forEach((image) => {
                    formData.append('images', image);
                });

                const res = await AxiosDataBase.axiosAdmin.post('/product/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(res);
                sessionStorage.clear()
                window.location.reload();

            }
            else {
                show_message_error();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id='body-products-add' className='relative flex flex-row w-screen h-screen justify-around items-center flex-wrap '>
            {
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

            }
            <Show_image trigger={State} setTrigger={setState} image={image} />
            <form className='w-10/12 h-5/6' encType="multipart/form-data" onSubmit={handleSubmit} >
                <div className='flex flex-col h-[100%] w-full bg-white rounded-2xl shadow-2xl'>
                    <div id='box-item-inputs-add-products' className='flex flex-col mt-44 w-full h-1/3  justify-around items-center'>
                        <div className='flex flex-row flex-wrap pt-10 w-full h-full justify-around items-center'>
                            <TextField
                                className='w-1/4'
                                name='name'
                                label='اسم المنتج'
                                variant='outlined'
                                value={data.name}
                                onChange={handleTypeChange}
                            />
                            <TextField
                                select
                                label='نوع المنتج'
                                variant='outlined'
                                value={data.type}
                                onChange={handleTypeChangeSel}
                                className='w-1/4'
                            >
                                {
                                    FilterData.mark.map((option: { name: string }) => (
                                        <MenuItem key={option.name} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </div>
                        <div className='flex flex-row flex-wrap pt-10 w-full h-full justify-around items-center'>
                            <TextField
                                className='w-1/4'
                                name='price'
                                label='سعر المنتج'
                                variant='outlined'
                                value={data.price}
                                onChange={handleTypeChange}
                            />
                            <TextField
                                className='w-1/4'
                                name='quantity'
                                label='الكمية المتوفرة'
                                variant='outlined'
                                value={data.quantity}
                                onChange={handleTypeChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap pt-10 w-full h-full justify-around items-center'>
                            <TextField
                                select
                                label='تصنيف المنتج'
                                variant='outlined'
                                value={data.Category}
                                name='Category'
                                onChange={handleTypeChange}
                                className='w-1/4'
                            >
                                {
                                    (data.type === "Nike" || data.type === "Converse") ? (
                                        FilterData.mark.map((option: { name: string, Category: [] }) => (
                                            option.name === data.type ? (
                                                option.Category.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))
                                            ) : null
                                        ))
                                    ) : <MenuItem key={data.type} value={data.type}>
                                        {data.type}
                                    </MenuItem>
                                }
                            </TextField>
                        </div>
                        <div className='flex flex-col   space-x-2 space-y-10  justify-around items-center'>
                            <input id='input-image' multiple type="file" onChange={imageChange} />
                            <div className='flex flex-col items-center border-dashed border-2 p-5 border-sky-500'>
                                <label htmlFor="input-image">Upload Image</label>
                                <FontAwesomeIcon icon={faUpload} />

                            </div>
                            {showButton()}
                            <button className='w-36 h-5 relative ' type='submit' style={buttonStyle} >
                                اضافة المنتج
                            </button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
