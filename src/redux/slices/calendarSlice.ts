// desc: This file contains the calendar slice which is used to store the calendar data in the redux store.
// The calendar data is loaded from the calendarData.json file and stored in the redux store using this slice.
import { createSlice } from "@reduxjs/toolkit";
import calendarData from "../../data/calendarData.json"; 

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    data: calendarData,
  },
  reducers: {},
});

export default calendarSlice.reducer;
