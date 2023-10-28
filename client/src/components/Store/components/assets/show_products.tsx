import { useState, useEffect } from 'react';
import { Box } from '@mui/material'; // أضفت Box هنا

import AxiosDataBase from '../../../../Axios/AxiosDataBase';
import { useNavigate } from 'react-router-dom';
function show_products() {
  const nagitve = useNavigate()
  const [shoes, setshoes] = useState<any[]>([])
  const get_shoes = async () => {
    try {
      const response = await AxiosDataBase.axiosLogin.get("/get_prodeuct/home", {
        params: {
          page: 1,
          limit: 10,
          type: 'homestore'
        }
      })
      setshoes(response.data.result)

    } catch (error) {
      console.log(error)
    }
  }

  const movenextpage = (e: React.MouseEvent<HTMLElement>) => {
    const customValue = e.currentTarget.getAttribute('id');
    nagitve(`/product/${customValue}`)
    // or e.currentTarget.id directly
  }
  useEffect(() => {
    get_shoes()

  }, [])
  return (
    <Box
      sx={{
        display: { xs: 'grid', md: 'grid' },
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      }}
      className=' col-span-3  grid  grid-cols-3 gap-10 justify-items-center content-center'>
      {
        shoes.map((shoe: any) => (
          <Box key={shoe._id}
            sx={{
              width: { xs: '100%', md: '70%', xl:"70%" },
            }}
            className='w-64 h-[360px] grid grid-cols-2 grid-rows-2 rounded-md bg-white shadow-xl  border-black border-2 '>
            <Box
            sx={{
              height: {xs:"91%"}
            }}
            className='iamge col-span-2 row-span-3 flex items-center justify-center w-full'>
              <img
                onClick={movenextpage}
                id={shoe._id}
                className="w-full h-[250px] rounded-t-md shadow-md transform scale-100 transition-transform hover:scale-110"
                src={`${shoe.mainImage.linkimage}`}
                alt=""
              />
            </Box>
            <div className=' relative top-5 col-span-2 flex flex-col justify-center items-end ml-5 h-1/2'>
              <p className='text-2xl text-center'>{shoe.name}</p>
              <p className='text-4xl text-center'>${shoe.price}</p>
            </div>

          </Box>
        ))
      }
    </Box >
  )
}

export default show_products