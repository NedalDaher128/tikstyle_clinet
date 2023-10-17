import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import Cookies from "universal-cookie"
const cookies = new Cookies(null ,{ path: '/' });

// الملف الذي يحتوي على المتغيرات المشتركة


interface DataToken {
    token: string
}

const initialState: DataToken = {
    token: ""
}

const AccountAdminSlice = createSlice({
    name: "AccountAdmin",
    initialState,
    reducers: {
        loginAdmin: (state, action: PayloadAction<string>) => {
            // يمكنك تحديث الحالة هنا بناءً على العملية
            state.token = action.payload;

            cookies.set("tokenAdmin",state.token,{path: '/', expires: new Date(Date.now()+2592000)})
        }
    }
});

// يمكنك تصدير مشغل الحالة والأعمال الأخرى
export const { loginAdmin } = AccountAdminSlice.actions;
export default AccountAdminSlice.reducer;
