import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { setParams, setIDrow } from '../../../redux/Silce/ActionsSilce';
import Show_image from '../../popup/Show_image_table';
import AxiosDataBase from '../../../Axios/AxiosDataBase';
import Actions from './actions/Curd_Table';
interface Product {
  _id: string;
  name: string;
  price: number;
  type: string;
  Category: string;
  quantity: number;
}

export default function DataTable() {
  const [rows, setRows] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const [stateiconimage] = useState(true);
  const typeAction = "product"
  const state = useSelector((state: any) => state.filter.statuspopup);
  const img = JSON.parse(sessionStorage.getItem('datafile') as string)
  console.log(rows  )
  // تعريف أعمدة الجدول
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'رقم تعريفي', width: 200 },
    { field: 'name', headerName: 'اسم المنتج', editable: true, width: 130 },
    { field: 'price', headerName: 'السعر', editable: true, width: 130 },
    { field: 'type', width: 130, headerName: 'النوع' },
    {
      field: 'Category',
      headerName: 'تصنيف',
      type: 'singleSelect',
      valueOptions: (params) => {
        // تعيين الخيارات المتاحة لحقل التصنيف بناءً على نوع المنتج
        if (['Nike', 'Converse'].includes(params.row.type)) {
          return params.row.type === 'Converse'
            ? ['Chuck Taylor', 'Jack Purcell', 'One Star', 'Run Star']
            : ['Air Force', 'Air Max', 'Air Jordan', 'Blazer'];
        }
        return [];
      },
      width: 90,
    },
    { field: 'quantity', headerName: 'الكمية', type: 'number', editable: true, width: 90 },
    { field: 'actions', headerName: 'العمليات', width: 190, renderCell: params => <Actions {...{ params, stateiconimage, typeAction }} /> },
  ];
  // دالة لجلب البيانات من الخادم
  const fetchRows = async () => {
    try {
      const response = await AxiosDataBase.axiosAdmin.get('/product/get');
      const products: Product[] = response.data.product.map((product: Product) => {
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          type: product.type,
          quantity: product.quantity,
          Category: product.Category,
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
    <div>
      {state && <Show_image trigger={state} image={img} />}

      {/* تكوين جدول البيانات */}
      <div className=' w-full'>
        <DataGrid
          className=' w-screen  '
          sx={{ height:"100vh"}}
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
            AxiosDataBase.axiosAdmin.put('/product/update', params);
          }}
          onRowClick={(params) => {
            dispatch(setIDrow(params.id));

          }}
          onCellEditStart={(params) => {
            // تخزين معرف الصف المحدد عند بدء تحرير الخلية
            dispatch(setIDrow(params.id));

          }}
          onCellEditStop={(params) => {
            // تخزين بيانات الصف عند انتهاء تحرير الخلية
            dispatch(setParams(params.row));
          }}
        />
      </div>

    </div>
  );

}
