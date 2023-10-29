import { Box, Fab  } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface CurdTableActionsProps {
    params: any;
    setshow:any;
}

const CurdTableActions = ( params : CurdTableActionsProps) => {



  
   

    return (
        <>
            <Box
                sx={{
                    m: 1,
                    position: 'relative'
                }}
            >
                        // عرض الأيقونة المعينة عندما يكون isSelect و successDelete متوفرين
                    
                        <Fab
                            color='primary'
                            sx={{
                                width: '30px',
                                height: '30px',
                            }}
                            onClick={() => { params.setshow(true)}}
                        >
                            <VisibilityIcon />
                        </Fab>
                    
            </Box>
        </>


    );
};

export default CurdTableActions;
