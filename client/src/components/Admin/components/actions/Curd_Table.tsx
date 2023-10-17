import { useState } from 'react';
import { Box, Fab  } from '@mui/material';
import { Check, Delete, Image } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import AxiosDataBase from '../../../../Axios/AxiosDataBase';
import {  setstatuspopup } from '../../../../redux/Silce/FilterSilce';

interface CurdTableActionsProps {
    params: any;
    stateiconimage: boolean;
    typeAction: string;
}

const CurdTableActions = ({ params, stateiconimage,typeAction }: CurdTableActionsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [successDelete, setSuccessDelete] = useState<boolean>(false);
    const IDrow = useSelector((state: any) => state.actionstabel.Idrow);

    const dispatch = useDispatch();


    const handleDeleteClick = async () => {
        try {
            if(typeAction == "user"){
                const res = await AxiosDataBase.axiosAdmin.delete(`/user/remove/${params.id}`);
                console.log(res);
                setSuccessDelete(true);
                setLoading(false);
                setTimeout(() => {
                setSuccess(false);
                }, 2000);
            } if (typeAction =="product"){
                console.log(32141342);
                const res = await AxiosDataBase.axiosAdmin.delete(`/product/remove/${params.id}`);
                console.log(res);
                setSuccessDelete(true);
                setLoading(false);
                setTimeout(() => {
                    setSuccess(false);
                }, 2000); 
        }
        } catch (err) {
            console.log(err);
        }
    };
   

    return (
        <>
            <Box
                sx={{
                    m: 1,
                    position: 'relative'
                }}
            >
                {successDelete ? (
                    // عرض الأيقونة المعينة عندما يكون isSelect و successDelete متوفرين
                    <Fab
                        color='primary'
                        sx={{
                            width: '30px',
                            height: '30px',
                        }}
                    >
                        <Check />
                    </Fab>
                ) : (
                    <Fab
                        color='primary'
                        sx={{
                            width: '30px',
                            height: '30px',
                        }}
                        disabled={params.id !== IDrow || loading}
                        onClick={handleDeleteClick}
                    >
                        <Delete />
                    </Fab>

                )}
            </Box>
            <Box
                sx={{
                    m: 1,
                    position: 'relative'
                }}
            >
                {stateiconimage ? (
                    success ? (
                        // عرض الأيقونة المعينة عندما يكون isSelect و successDelete متوفرين
                        <Fab
                            color='primary'
                            sx={{
                                width: '30px',
                                height: '30px',
                            }}
                        >
                            <Check />
                        </Fab>
                    ) : (
                        <Fab
                            color='primary'
                            sx={{
                                width: '30px',
                                height: '30px',
                            }}
                            disabled={params.id !== IDrow || loading}
                            onClick={() => { dispatch(setstatuspopup(true)) }}
                        >
                            <Image />
                        </Fab>
                    )
                ) : (
                    "" // إذا كانت stateiconimage تساوي false
                )}

            </Box>
        </>


    );
};

export default CurdTableActions;
