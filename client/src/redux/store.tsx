import { configureStore } from '@reduxjs/toolkit';
import AccountSlice from './Silce/AccountSilce'; // تأكد من أن اسم الملف صحيح هنا
import AccountSilceAdmin from './Silce/AccountSilceAdmin';
import FilterSlice from './Silce/FilterSilce'
import ActionStabel from './Silce/ActionsSilce'
import CartSilce from './Silce/CartSilce';

const store = configureStore({
  reducer: {
    account: AccountSlice, // تأكد من أن اسم الحالة (state) صحيح هنا
    admin: AccountSilceAdmin,
    filter: FilterSlice,
    actionstabel:ActionStabel,
    cart:CartSilce
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store; // قم بتصدير المخزن باستخدام الاستيراد الافتراضي 'default'
