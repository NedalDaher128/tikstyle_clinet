// filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mark: [
     {name:"Buma" },
     {name:"Reebok"},
     {name:"New Balance", Category:[""]},
     {name:"Nike", Category:["Air jordan" ,"Air jordan 4","Jordan low","Blazer","Blazer low","Dank low","Air force","Air force LV"]},
     {name:"Adidas"},
     {name:"Alexander"},
     {name:"Vans"},
     {name:"Converse", Category:["Converse Simple","Converse Star","Converse High Top"]},
  ],
  size: [36, 37, 38, 39, 40],
  datafile: [{
    color:""
  }],
  statuspopup: false,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {

    setfilename: (state, action) => {
      state.datafile = action.payload;
      sessionStorage.setItem("datafile", JSON.stringify(action.payload));
    },
    setstatuspopup: (state, action) => {
      state.statuspopup = action.payload;
    },
  },
});

export const { setfilename,setstatuspopup } = filterSlice.actions;
export default filterSlice.reducer;
