// Planning component to display planning data in a grid
// This component uses the ag-Grid library to display planning data in a grid. It fetches data from the Redux store and formats it for display in the grid. The grid allows users to edit sales units for each store, SKU, and week, and calculates sales dollars, GM dollars, and GM percentage based on the input. The grid also provides color-coded indicators for GM percentage to highlight performance.
// The component uses memoization to optimize performance by reducing unnecessary re-renders.
import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { ColDef} from "ag-grid-community";
import { RootState } from "../redux/store";
import { shallowEqual } from "react-redux";
import { createSelector } from "reselect";

// TypeScript interfaces
interface Store {
  "Seq No.": number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

interface Sku {
  seq_id: number;
  id: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number | string;
  Cost: number | string;
}

interface CalendarWeek {
  id: string;
  label: string;
  month: string;
}

interface PlanningEntry {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
}

// Memoized selectors
const selectStores = (state: RootState) => state.store.stores as Store[];
const selectSkus = (state: RootState) => state.sku.skus as Sku[];
const selectPlanning = (state: RootState) => state.planning.data as PlanningEntry[];
const selectCalendar = createSelector(
  (state: RootState) => state.calendar.data,
  (calendarData) =>
    calendarData.map((week: any) => ({
      id: week.Week,
      label: week["Week Label"],
      month: week.Month,
    })) as CalendarWeek[]
);

// Utility function to parse price/cost
const parsePriceOrCost = (value: number | string): number =>
  typeof value === "number" ? value : parseFloat(String(value || "").replace("$", "").trim()) || 0;

const Planning: React.FC = () => {
  const stores = useSelector(selectStores, shallowEqual);
  const skus = useSelector(selectSkus, shallowEqual);
  const calendar = useSelector(selectCalendar, shallowEqual);
  const planning = useSelector(selectPlanning, shallowEqual);

  // Parse SKUs once
  const parsedSkus = useMemo(() => {
    return skus.map((sku) => ({
      id: sku.id,
      Label: sku.Label,
      price: parsePriceOrCost(sku.Price),
      cost: parsePriceOrCost(sku.Cost),
    }));
  }, [skus]);

  // Create planning map efficiently
  const planningMap = useMemo(() => {
    return new Map(
      planning.map((p) => [`${p.Store}_${p.SKU}_${p.Week}`, Number(p["Sales Units"]) || 0])
    );
  }, [planning]);

  // Generate rowData with minimal properties
  const rowData = useMemo(() => {
    if (!stores.length || !parsedSkus.length || !calendar.length) return [];

    return stores.flatMap((store) =>
      parsedSkus.map((sku) => {
        const row: Record<string, any> = {
          storeId: store.ID,
          storeLabel: store.Label,
          skuId: sku.id,
          skuLabel: sku.Label,
          price: sku.price,
          cost: sku.cost,
        };
        for (const week of calendar) {
          row[`salesUnits_${week.id}`] = planningMap.get(`${store.ID}_${sku.id}_${week.id}`) || 0;
        }
        return row;
      })
    );
  }, [stores, parsedSkus, calendar, planningMap]);

  // Define column definitions with reusable utilities
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
  }), []);

  const columnDefs = useMemo(() => {
    const baseColumns: ColDef[] = [
      { headerName: "Store", field: "storeLabel", pinned: "left" as const, width: 200 },
      { headerName: "SKU", field: "skuLabel", pinned: "left" as const, width: 250 },
    ];

    const monthGroups = calendar.reduce((acc: Record<string, CalendarWeek[]>, week) => {
      acc[week.month] = acc[week.month] || [];
      acc[week.month].push(week);
      return acc;
    }, {});

    const getMonthName = (month: string) => (month === "M01" ? "Feb" : "Mar"); // Expand as needed

    const monthColumns = Object.entries(monthGroups).map(([month, weeks]) => ({
      headerName: getMonthName(month),
      children: weeks.map((week) => ({
        headerName: week.label,
        children: [
          {
            headerName: "Sales Units",
            field: `salesUnits_${week.id}`,
            editable: true,
            width: 120,
            valueParser: (params: any) => Number(params.newValue) || 0,
          },
          {
            headerName: "Sales Dollars",
            field: `salesDollars_${week.id}`,
            width: 120,
            editable: false,
            valueGetter: (params: any) =>
              (params.data[`salesUnits_${week.id}`] || 0) * (params.data.price || 0),
            valueFormatter: (params: { value: number }) => `$${params.value.toFixed(2)}`,
          },
          {
            headerName: "GM Dollars",
            field: `gmDollars_${week.id}`,
            width: 120,
            editable: false,
            valueGetter: (params: any) => {
              const salesUnits = params.data[`salesUnits_${week.id}`] || 0;
              return salesUnits * ((params.data.price || 0) - (params.data.cost || 0));
            },
            valueFormatter: (params: { value: number }) => `$${params.value.toFixed(2)}`,
          },
          {
            headerName: "GM %",
            field: `gmPercent_${week.id}`,
            width: 100,
            editable: false,
            valueGetter: (params: any) => {
              const salesUnits = params.data[`salesUnits_${week.id}`] || 0;
              const salesDollars = salesUnits * (params.data.price || 0);
              const gmDollars = salesUnits * ((params.data.price || 0) - (params.data.cost || 0));
              return salesDollars ? (gmDollars / salesDollars) * 100 : 0;
            },
            valueFormatter: (params: { value: number }) => `${params.value.toFixed(2)}%`,
            cellStyle: (params: any) => {
              const value = params.value || 0;
              return value >= 40
                ? { backgroundColor: "green", color: "white" }
                : value >= 10
                ? { backgroundColor: "yellow" }
                : value > 5
                ? { backgroundColor: "orange" }
                : { backgroundColor: "red", color: "white" };
            },
          },
        ],
      })),
    }));

    return [...baseColumns, ...monthColumns];
  }, [calendar]);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={50}
        rowBuffer={20}
        // immutableData={true}
        getRowId={(params) => `${params.data.storeId}_${params.data.skuId}`}
      />
    </div>
  );
};

export default React.memo(Planning);