// Code for managing the store data in the Redux store
// This code defines a slice for managing the store data in the Redux store. It contains actions to add, update, and delete store items. The store data is stored in the Redux store and is persisted in the local storage.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreItem } from "../../types";
import data from "../../data/storeData.json";

const LOCAL_STORAGE_KEY = "storeData";

// Load data from localStorage (if available), otherwise use storeData.json
const storedStores = localStorage.getItem(LOCAL_STORAGE_KEY);
const initialState = {
  stores: storedStores ? JSON.parse(storedStores) : data,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<StoreItem>) => {
      state.stores.push(action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.stores)); // Update localStorage
    },
    setStores: (state, action: PayloadAction<StoreItem[]>) => {
      state.stores = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.stores)); // Update localStorage
    },
    updateStore: (state, action: PayloadAction<StoreItem>) => {
      const index = state.stores.findIndex((store: { ID: string; }) => store.ID === action.payload.ID);
      if (index !== -1) {
        state.stores[index] = action.payload;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.stores)); // Update localStorage
      }
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((store: { ID: string; }) => store.ID !== action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.stores)); // Update localStorage
    },
  },
});

export const { addStore, updateStore, deleteStore, setStores } = storeSlice.actions;
export default storeSlice.reducer;
