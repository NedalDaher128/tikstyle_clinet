  import  { useState, useEffect } from 'react';
  import Show_Cart_admin from '../../popup/Show_Cart_admin';
  import { DataGrid, GridColDef } from '@mui/x-data-grid';
  import AxiosDataBase from '../../../Axios/AxiosDataBase';

  interface Order {
    _id: string;
    user: string;
    name: string;
    price: number;
    phone: string;
    city: string;
    address: string;
    status: string;
    cart: [];
  }

  function get_orders() {
    const [rows, setRows] = useState<Order[]>([]);
    const [isvisble, setisvisble] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null); // لتخزين البيانات المحددة

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'رقم تعريفي', width: 200 },
      { field: 'iduser', headerName: ' رقم التعريفي للمرسل', width: 200 },
      { field: 'name', headerName: ' اسم المرسل', width: 200 },
      { field: 'price', headerName: 'السعر', width: 40 },
      {
        field: 'address',
        headerName: 'العنوان',
        width: 330,
      },
      {
        field: 'phone',
        headerName: 'رقم الهاتف',
        width: 120,
      },
      {
        field: 'city',
        headerName: 'العنوان',
        width: 120,
      },
      {
        field: 'cart',
        headerName: 'عربة التسوق',
        width: 90,
        renderCell: (params) => (
          <>
            <button onClick={() => handleShowCart(params.row.cart)}>عرض</button>
          </>
        ),
      },
      {
        field: 'status',
        headerName: 'حالة الطلب',
        width: 90,
      },
    ];

    // دالة لجلب البيانات من الخادم
    const fetchRows = async () => {
      try {
        const response = await AxiosDataBase.axiosAdmin.get('/order/get');
        console.log(response);
        const order: Order[] = response.data.AllOrders.map((order: Order) => {
          return {
            id: order._id,
            iduser: order.user,
            name: order.name,
            price: order.price,
            address: order.address,
            phone: order.phone,
            city: order.city,
            status: order.status,
            cart:order.cart
          };
        });
        setRows(order); // تحديث الحالة بعد جلب البيانات
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      fetchRows();
    }, []);

    const handleShowCart = (cartData:any) => {
      setSelectedRowData(cartData);
      setisvisble(true);
    };

    return (
      <div>
        {isvisble && <Show_Cart_admin rowData={selectedRowData} trigger={isvisble} setTrigger={setisvisble} />}
        {/* تكوين جدول البيانات */}
        <div className='w-full'>
          <DataGrid
            className='w-screen'
            sx={{ height: '100vh' }}
            rows={rows}
            columns={columns}
            autoPageSize
            getRowId={(row) => row.id} // تحديد مفتاح الصف
            localeText={{
              MuiTablePagination: {
                labelDisplayedRows: ({ from, to, count }) => `عرض ${from}-${to} من ${count} صف`,
                labelRowsPerPage: 'صفوف في الصفحة',
              },
            }}
          />
        </div>
      </div>
    );
  }

  export default get_orders;
