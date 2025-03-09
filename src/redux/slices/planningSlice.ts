// Desc: Planning slice for redux store
// This file contains the planning slice which is used to store the planning data in the redux store.
import { createSlice } from "@reduxjs/toolkit";
import planningData from "../../data/planningData.json"; 

const planningSlice = createSlice({
  name: "planning", 
  initialState: {
    data: planningData,
  },
  reducers: {},
});

export default planningSlice.reducer;
