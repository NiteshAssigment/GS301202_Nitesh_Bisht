// Definition of the SKU slice, which contains the SKU data and actions to add, update, and delete SKUs.
// The SKU data is stored in the Redux store and is persisted in the local storage.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkuData as SKUItem } from "../../types";
import skuData from "../../data/skuData.json";

const LOCAL_STORAGE_KEY = "skuData";

// Load data from localStorage (if available), otherwise use skuData.json
const storedSKUs = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState = {
  skus: storedSKUs ? JSON.parse(storedSKUs) : skuData,
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKUItem>) => {
      state.skus.push(action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.skus)); // Update localStorage
    },
    setSKUs: (state, action: PayloadAction<SKUItem[]>) => {
      state.skus = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.skus)); // Update localStorage
    },
    updateSKU: (state, action: PayloadAction<SKUItem>) => {
      const index = state.skus.findIndex((sku: { id: string }) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.skus)); // Update localStorage
      }
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku: { id: string }) => sku.id !== action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.skus)); // Update localStorage
    },
  },
});

export const { addSKU, updateSKU, deleteSKU, setSKUs } = skuSlice.actions;
export default skuSlice.reducer;
