import { createSlice } from "@reduxjs/toolkit";

interface Account {
  items: any[];
  total: number;
  totalItems: number;
  StatusIconHeader: {
    cart: number;
    heart: number;
  };
}
function calculateTotalPrice(items:any) {
  return items.reduce((total:any, item:any) => total + (item.count * parseInt(item.price)), 0);
}

// تحقق من وجود بيانات مخزنة في localStorage واستخدامها كقيم افتراضية إذا وجدت.
const storedData = localStorage.getItem("cart");
const initialCart = storedData ? JSON.parse(storedData) : [];
const storedTotal = JSON.parse(localStorage.getItem("total") || "0");
const storedPrice = JSON.parse(localStorage.getItem("price") || "0");
const initialState: Account = {
  items: initialCart, // استخدم البيانات المخزنة في localStorage كقيمة ابتدائية هنا
  total: storedPrice,
  totalItems: initialCart.length, // قم بضبط عدد العناصر استنادًا إلى البيانات المخزنة
  StatusIconHeader: {
    cart: storedTotal, // قم بضبط عدد العناصر في العربة استنادًا إلى البيانات المخزنة
    heart: 0, // قم بضبط العناصر المفضلة استنادًا إذا كانت متاحة
  },
};

const AccountSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    additem: (state, action) => {
      const finditems = state.items.find((item: any) => item._id === action.payload._id && item.size === action.payload.size);
      if (!finditems) {
        console.log(action.payload)
        console.log(2)
        state.items.push(action.payload);
        state.StatusIconHeader.cart++;
        state.total += parseInt(action.payload.price);

        // تشفير السعر قبل تخزينه في localStorage
        localStorage.setItem("cart", JSON.stringify(state.items));
        localStorage.setItem("total", state.StatusIconHeader.cart.toString());
        localStorage.setItem("price", JSON.stringify(state.total));
      } else {
        finditems.count++; // زيادة العدد
        state.StatusIconHeader.cart++;
        state.total += parseInt(action.payload.price);

        // تشفير السعر قبل تخزينه في localStorage
        localStorage.setItem("cart", JSON.stringify(state.items));
        localStorage.setItem("total", state.StatusIconHeader.cart.toString());
        localStorage.setItem("price", JSON.stringify(state.total));
      }
    },
    removeitem: (state, action) => {
      const { _id, size } = action.payload;
    
      // ابحث عن المنتج الذي تريد حذفه بناءً على الـ _id والمقاس
      const productToRemove = state.items.find((item: any) => item._id === _id && item.size === size);
    
      if (productToRemove) {
        if (productToRemove.count > 1) {
          // إذا كانت الكمية أكبر من 1، فقط انقرض العدد
          productToRemove.count--;
        } else {
          // إذا كانت الكمية تساوي 1، قم بإزالة المنتج بالكامل
          state.items = state.items.filter((item: any) => !(item._id === _id && item.size === size));
        }
    
        // قم بحساب الإجمالي وتحديثه هنا (قد تحتاج لإعادة حساب الإجمالي بالكامل)
        state.total = calculateTotalPrice(state.items);
    
        state.StatusIconHeader.cart--;
    
        // تشفير السعر قبل تخزينه في localStorage
        localStorage.setItem("cart", JSON.stringify(state.items));
        localStorage.setItem("total", state.StatusIconHeader.cart.toString());
        localStorage.setItem("price", JSON.stringify(state.total));
      }
    }
    
  },
});

export const { additem, removeitem } = AccountSlice.actions;
export default AccountSlice.reducer;
