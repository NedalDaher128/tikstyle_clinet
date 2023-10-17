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
      const finditems = state.items.find((item: any) => item._id === action.payload._id);

      if (!finditems) {
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
      const finditems = state.items.find((item: any) => item._id === action.payload._id);

      if (finditems) {
        if (finditems.count === 1) {
          state.items = state.items.filter((item: any) => item._id !== action.payload._id);
          state.total -= parseInt(action.payload.price);
        } else {
          finditems.count--;
          state.total -= parseInt(action.payload.price);
        }
        state.StatusIconHeader.cart--;

        // تشفير السعر قبل تخزينه في localStorage
        localStorage.setItem("cart", JSON.stringify(state.items));
        localStorage.setItem("total", state.StatusIconHeader.cart.toString());
        localStorage.setItem("price", JSON.stringify(state.total));
      }
    },
  },
});

export const { additem, removeitem } = AccountSlice.actions;
export default AccountSlice.reducer;
