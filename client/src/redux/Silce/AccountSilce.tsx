import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

interface Account {
  Status: boolean;
  AccountUsers: {
    token: string;
  };
  StatusIconHeader: {
    cart: number;
    heart: number;
  };
}
// localStorage.getItem("Status") === "true"
// جلب قيمة "Status" من localStorage إذا كانت موجودة، وإلا استخدم القيمة الافتراضية false
const initialState: Account = {
  Status: cookies.get("status") === true ? true : false,
  AccountUsers: {
    token: ""
  },
  StatusIconHeader: {
    cart: 0,
    heart: 0
  },
};

const AccountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.AccountUsers = action.payload.data.NewAccount;
      cookies.set("tokenUser", action.payload.data.token);
      cookies.set("status", true as boolean , { path: '/' } ); 
      localStorage.setItem('Account', JSON.stringify(state.AccountUsers));
      // تعيين قيمة "Status" في localStorage استنادًا إلى قيمة "Status" في Redux
      localStorage.setItem('Status', action.payload.data.Status  ? "true" : "false");

    },
  },
});

export const { login } = AccountSlice.actions;
export default AccountSlice.reducer;
