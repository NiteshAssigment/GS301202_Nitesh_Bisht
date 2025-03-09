// Desc: Chart slice for redux store
import { createSlice } from "@reduxjs/toolkit";
import chartData from "../../data/chartData.json"; 

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: chartData,
  },
  reducers: {},
});

export default chartSlice.reducer;
