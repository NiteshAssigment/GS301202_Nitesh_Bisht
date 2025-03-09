// Desc: This file contains the main component for the SKU page. 
// It uses the ag-grid-react library to display the SKU data in a table format. 
// It also contains the logic to add, edit, and delete SKU data. 
// The SKU data is stored in the Redux store and is persisted in the local storage.
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import {
  deleteSKU,
  addSKU,
  updateSKU,
  setSKUs,
} from "../redux/slices/skuSlice";
import { Trash2, Edit2 } from "lucide-react";
import Button from "../components/Button";
import SkuForm from "../components/SkuForm";
import { SkuData } from "../types";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

const LOCAL_STORAGE_KEY = "skuData";

const Sku = () => {
  const skus = useSelector((state: RootState) => state.sku.skus);
  const calendar = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState<SkuData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      dispatch(setSKUs(JSON.parse(storedData)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(skus));
  }, [skus]);

  const handleDelete = useCallback(
    (id: string) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this SKU?"
      );
      if (isConfirmed) {
        dispatch(deleteSKU(id));
      }
    },
    [dispatch]
  );

  const handleAddSku = (sku: Omit<SkuData, "seq_id">) => {
    const newSeqId = skus.length > 0 ? skus[skus.length - 1].seq_id + 1 : 101; 
    const newSku: SkuData = {
      seq_id: newSeqId,
      ...sku,
    };
    dispatch(addSKU(newSku));
    setIsModalOpen(false);
  };
  

  const handleEditSku = (sku: SkuData) => {
    setSelectedSku(sku);
    setIsModalOpen(true);
  };

  const handleUpdateSku = (updatedSku: SkuData) => {
    dispatch(updateSKU(updatedSku));
    setIsModalOpen(false);
    setSelectedSku(null);
  };

  const columnDefs: ColDef<SkuData>[] = [
    { headerName: "ID", field: "id", sortable: true, filter: true, maxWidth: 110 },
    { headerName: "Label", field: "Label", sortable: true, filter: true,width: 250 },
    { headerName: "Class", field: "Class", sortable: true, filter: true,width: 120  },
    { headerName: "Department", field: "Department", sortable: true, filter: true,width: 200  },
    { headerName: "Price ($)", field: "Price", sortable: true, filter: true ,width: 120  },
    { headerName: "Cost ($)", field: "Cost", sortable: true, filter: true ,width: 120 },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2 items-center">
          <button onClick={() => handleEditSku(params.data)}>
            <Edit2 className="text-gray-500 hover:text-gray-700 transition duration-200 size-5" />
          </button>
          <button onClick={() => handleDelete(params.data.id)}>
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
         rowData={skus ?? []}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true }}
          gridOptions={{
            headerHeight: 50,
            rowHeight: 40,
            getRowStyle: (params) => ({
              background:
                params.node &&
                params.node.rowIndex !== null &&
                params.node.rowIndex % 2 === 0
                  ? "#f9f9f9"
                  : "#e0e0e0",
              paddingTop: "4px",
              border: "none",
            }),
          }}
        />
      </div>
      <Button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        Add SKU
      </Button>

      <SkuForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSku(null);
        }}
        onSubmit={selectedSku ? handleUpdateSku : handleAddSku}
        initialData={selectedSku}
      />
    </div>
  );
};

export default Sku;
