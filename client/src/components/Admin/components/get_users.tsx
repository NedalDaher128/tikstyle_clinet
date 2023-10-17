import  { useState, useEffect,  } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import {  setIDrow } from '../../../redux/Silce/ActionsSilce';
import AxiosDataBase from '../../../Axios/AxiosDataBase';
import Actions from './actions/Curd_Table';

interface User   {
  _id: string;
  email: string;
  password: string;
  username: string;
  name: string;
}

export default function DataTable() {
  const [rows, setRows] = useState<User[]>([]);
  const dispatch = useDispatch();
  const [stateiconimage] = useState(false);
  const typeAction = "user"
  // تعريف أعمدة الجدول
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'رقم تعريفي', width: 200 },
    { field: 'name', headerName: 'اسم الحساب', editable: true, width: 130 },
    { field: 'email', headerName: 'البريد الإلكتروني', editable: true, width: 130 },
    { field: 'username', width: 130, headerName: 'اسم المستخدم' },
    { field: 'password', headerName: 'كلمة السر', editable: true, width: 90 },
    { field: 'actions', headerName: 'العمليات', width: 190, renderCell: params => <Actions {...{ params ,stateiconimage,typeAction }} /> },
  ];

  // دالة لجلب البيانات من الخادم
  const fetchRows = async () => {
    try {
      const response = await AxiosDataBase.axiosAdmin.get('/user/get');
      console.log(response.data.users);
      const products: User[] = response.data.users.map((users: User) => {
        return {
          id: users._id,
          name: users.name,
          email: users.email,
          password: "********",
          username: users.username,
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

  return (
    <>

      {/* تكوين جدول البيانات */}
      <div className=' dataGrid-responve  w-full'>
        <DataGrid
          sx={{ width: '100%' }}
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
            AxiosDataBase.axiosAdmin.put(`/user/update/${params.id}`, params);
          }}
          onRowClick={(params) => {
            dispatch(setIDrow(params.id));

          }}


        />
      </div>

    </>

  );

}
