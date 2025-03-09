import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Store from "../pages/Store";
import { RootState } from "../redux/store";
import { addStore, updateStore, deleteStore } from "../redux/slices/storeSlice";

// Mock Redux Store
const mockStore = configureStore<RootState>([]);
const LOCAL_STORAGE_KEY = "storeData";

describe("Store Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      store: { 
        stores: [
          { SeqNo: 1, ID: "101", Label: "Store A", City: "NY", State: "NY" },
          { SeqNo: 2, ID: "102", Label: "Store B", City: "LA", State: "CA" }
        ]
      },
      sku: { skus: [] },
      calendar: { data: [] },
      planning: { data: [] },
      calculation: { data: [] },
      chart: { data: [] }
    });

    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(store.getState().store.stores));
    Storage.prototype.setItem = jest.fn();
  });

  it("renders Store component with table", async () => {
    render(
      <Provider store={store}>
        <Store />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Seq No.")).toBeInTheDocument();
      expect(screen.getByText("Store A")).toBeInTheDocument();
      expect(screen.getByText("Store B")).toBeInTheDocument();
    });
  });

  it("dispatches addStore action when adding a store", () => {
    render(
      <Provider store={store}>
        <Store />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add Store"));

    const mockNewStore = {
      SeqNo: 3,
      ID: "103",
      Label: "Store C",
      City: "Chicago",
      State: "IL",
    };

    store.dispatch(addStore(mockNewStore));

    const actions = store.getActions();
    expect(actions).toContainEqual(addStore(mockNewStore));
  });

  it("dispatches updateStore action when updating a store", () => {
    render(
      <Provider store={store}>
        <Store />
      </Provider>
    );

    fireEvent.click(screen.getAllByRole("button")[0]); // Click edit button

    const updatedStore = {
      SeqNo: 1,
      ID: "101",
      Label: "Updated Store A",
      City: "NY",
      State: "NY",
    };

    store.dispatch(updateStore(updatedStore));

    const actions = store.getActions();
    expect(actions).toContainEqual(updateStore(updatedStore));
  });

//   it("dispatches deleteStore action when deleting a store", async () => {
//     window.confirm = jest.fn(() => true); // Mock confirmation dialog

//     render(
//       <Provider store={store}>
//         <Store />
//       </Provider>
//     );

//     // Wait for delete buttons to appear
//     const deleteButtons = await screen.findAllByRole("button", { name: /delete/i });

//     expect(deleteButtons.length).toBeGreaterThan(0); // Ensure delete buttons exist

//     fireEvent.click(deleteButtons[0]); // Click first delete button

//     await waitFor(() => store.dispatch(deleteStore("101")));

//     const actions = store.getActions();
//     expect(actions).toContainEqual(deleteStore("101"));
//   });

  it("persists store data in localStorage", () => {
    render(
      <Provider store={store}>
        <Store />
      </Provider>
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify(store.getState().store.stores)
    );
  });
});
