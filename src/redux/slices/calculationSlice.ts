// Desc: Calculation slice for redux store
import { createSlice } from "@reduxjs/toolkit";
import calculationData from "../../data/calendarData.json"; 

const calculationSlice = createSlice({
  name: "calculation",
  initialState: {
    data: calculationData,
  },
  reducers: {},
});

export default calculationSlice.reducer;
