import { useState, useEffect, } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, } from 'react-redux';
import AxiosDataBase from '../../../Axios/AxiosDataBase'
import { setIDrow } from '../../../redux/Silce/ActionsSilce';

interface Coupon {
  _id: string;
  coupon: string;
  rate: number;
}
function get_coupon() {
  const [rows, setRows] = useState<Coupon[]>([]);
  const dispatch = useDispatch();
  // تعريف أعمدة الجدول
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'رقم تعريفي', width: 200 },
    { field: 'coupon', headerName: 'كود الخصم', editable: true, width: 130 },
    { field: 'discount', headerName: 'نسبة الخصم', editable: true, width: 130 },
  ];

  const fetchRows = async () => {
    try {
      const response = await AxiosDataBase.axiosAdmin.get('/coupon/get');
      console.log(response.data.coupondata);
      const products: Coupon[] = response.data.coupondata.map((coupon: Coupon) => {
        return {
          id: coupon._id,
          coupon: coupon.coupon,
          discount: coupon.rate,
        };
      });
      setRows(products); // تحديث الحالة بعد جلب البيانات
    } catch (err) {
      console.error(err);
    }
  };

  // تنفيذ جلب البيانات عند تحميل الكومبوننت
  useEffect(() => {
    fetchRows();
  }, []);

  useEffect(() => { }, [])
  return (
    <div className='  w-full'>
      <DataGrid
        className=' w-screen  '
        sx={{ height: "100vh" }}
        rows={rows}
        columns={columns}
        autoPageSize
        getRowId={(row) => row.id} // تحديد مفتاح الصف
        localeText={{
          MuiTablePagination: {
            // تخصيص نص مربع ترقيم الصفحات
            labelDisplayedRows: ({ from, to, count }) =>
              `عرض ${from}-${to} من ${count} صف`,
            labelRowsPerPage: 'صفوف في الصفحة',
          },
        }}
        processRowUpdate={async (params) => {
          // تحديث البيانات على الخادم عند تحرير الصف
          console.log(params);

          await AxiosDataBase.axiosAdmin.put(`/coupon/update/${params.id}`, params);
        }}
        onRowClick={(params) => {
          dispatch(setIDrow(params.id));

        }}

      />
    </div>)
}

export default get_coupon