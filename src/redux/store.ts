// Code to create the Redux store and export it for use in the application.
// The store is configured with the store and SKU reducers, which manage the store and SKU data,
//  respectively.
import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice";
import skuReducer from "./slices/skuSlice";
import calendarReducer from "./slices/calendarSlice"; 
import planningReducer from "./slices/planningSlice";
import calculationReducer from "./slices/calculationSlice";
import chartReducer from "./slices/chartSlice";

const store = configureStore({
  reducer: {
    store: storeReducer,
    sku: skuReducer,
    calendar: calendarReducer, 
    planning: planningReducer,
    calculation: calculationReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
