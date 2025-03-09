// Desc: This file contains the Store component which is responsible for rendering the store data in a table format using ag-grid-react.
// It also contains the logic to add, edit, and delete store data. The store data is stored in the Redux store and is persisted in the local storage.
// The StoreForm component is used to add or edit a store. It contains a form with fields for ID, Label, City, and State. The form is prefilled with the data of the selected store when editing. The user can submit the form to add or update the store. The form also includes validation to ensure that the required fields are filled.
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import { StoreItem } from "../types";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { deleteStore, addStore, updateStore, setStores } from "../redux/slices/storeSlice"; 
import Button from "../components/Button";
import { Trash2, Edit2 } from "lucide-react";
import StoreForm from "../components/StoreForm"; 
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const LOCAL_STORAGE_KEY = "storeData";

const Store: React.FC = () => {
  const stores = useSelector((state: RootState) => state.store.stores);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      dispatch(setStores(JSON.parse(storedData))); 
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stores));
  }, [stores]);

  const handleDelete = useCallback(
    (id: string) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this store?");
      if (isConfirmed) {
        dispatch(deleteStore(id));
      }
    },
    [dispatch]
  );

  const handleAddStore = (store: Omit<StoreItem, "SeqNo">) => {
    const newStore: StoreItem = {
      SeqNo: stores.length + 1,
      ...store,
    };
    dispatch(addStore(newStore));
    setIsModalOpen(false);
  };

  const handleEditStore = (store: StoreItem) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleUpdateStore = (updatedStore: StoreItem) => {
    dispatch(updateStore(updatedStore));
    setIsModalOpen(false);
    setSelectedStore(null);
  };

  const columnDefs: ColDef<StoreItem>[] = [
    { headerName: "Seq No.", field: "SeqNo", sortable: true, filter: true },
    { headerName: "ID", field: "ID", sortable: true, filter: true },
    { headerName: "Label", field: "Label", flex: 1, sortable: true, filter: true },
    { headerName: "City", field: "City", sortable: true, filter: true },
    { headerName: "State", field: "State", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2 items-center">
          <button onClick={() => handleEditStore(params.data)}>
            <Edit2 className="text-gray-500 hover:text-gray-700 transition duration-200 size-5" />
          </button>
          <button onClick={() => handleDelete(params.data.ID)}>
            <Trash2 className="text-gray-500 hover:text-gray-700 transition duration-200 size-5" />
          </button>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <div className="w-full flex flex-col items-start">
      <div className="ag-theme-alpine h-[460px] w-full border-0">
        <AgGridReact
          rowData={stores}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true }}
          gridOptions={{
            headerHeight: 50,
            rowHeight: 40,
            getRowStyle: (params) => ({
              background: params.node && params.node.rowIndex !== null && params.node.rowIndex % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
              paddingTop: '4px',
              border:"none"
            }),
          }}
        />
      </div>
      <Button 
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        Add Store
      </Button>

      <StoreForm 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStore(null);
        }} 
        onSubmit={selectedStore ? handleUpdateStore : handleAddStore} 
        initialData={selectedStore} 
      />
    </div>
  );
};

export default Store;