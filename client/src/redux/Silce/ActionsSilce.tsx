import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// الملف الذي يحتوي على المتغيرات المشتركة


interface DataToken {
    params: object|string
    Idrow:string
}

const initialState: DataToken = {
  params: {},
  Idrow:""
}

const AccountAdminSlice = createSlice({
    name: "Status",
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<any>) => {
            // يمكنك تحديث الحالة هنا بناءً على العملية
            state.params = action.payload;
        },
        setIDrow: (state, action: PayloadAction<any>) => {
            // يمكنك تحديث الحالة هنا بناءً على العملية
            state.Idrow = action.payload;
        }
    }
});

// يمكنك تصدير مشغل الحالة والأعمال الأخرى
export const { setParams,setIDrow } = AccountAdminSlice.actions;
export default AccountAdminSlice.reducer;
