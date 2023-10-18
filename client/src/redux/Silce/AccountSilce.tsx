import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

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

const initialState: Account = {
  Status: Cookies.get("status") === 'true',
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
      Cookies.set("tokenUser", action.payload.data.token);
      Cookies.set("status", action.payload.data.Status.toString(), { path: '/' });
      localStorage.setItem('Account', JSON.stringify(state.AccountUsers));
    },
  },
});

export const { login } = AccountSlice.actions;
export default AccountSlice.reducer;
