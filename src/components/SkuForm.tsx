// SkU Form Component
// This component is used to add or edit a SKU. 
// It contains a form with fields for ID, Label, Class, Department Price, and Cost. The form is prefilled with the data of the selected SKU when editing. The user can submit the form
// to add or update the SKU. The form also includes validation to ensure that the required fields are filled.
import React, { useState, useEffect } from "react";
import Button from "./Button";
import { SkuData } from "../types";

interface SkuFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sku: SkuData) => void;
  initialData?: SkuData | null;
}

const SkuForm: React.FC<SkuFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<SkuData>({
    seq_id: 0,
    id: "",
    Label: "",
    Class: "",
    Department: "",
    Price: 0,
    Cost: 0,
  });

  useEffect(() => {
    if (initialData) {
      // console.log("Prefilling form with:", initialData);
      setFormData({
        seq_id: initialData.seq_id || 0,
        id: initialData.id || "",
        Label: initialData.Label || "",
        Class: initialData.Class || "",
        Department: initialData.Department || "",
        Price: initialData.Price ?? 0, // Ensure it's not undefined
        Cost: initialData.Cost ?? 0, // Ensure it's not undefined
      });
    } else {
      setFormData({
        seq_id: 0,
        id: "",
        Label: "",
        Class: "",
        Department: "",
        Price: 0,
        Cost: 0,
      });
    }
  }, [initialData]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (!formData.id || !formData.Label) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit SKU" : "Add SKU"}
        </h2>

        {/* ID Field - Editable when adding, Disabled when editing */}
        <div className="mb-2">
          <input
            type="text"
            placeholder="ID"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="w-full p-2 border rounded"
            disabled={!!initialData} // Disable when editing
          />
        </div>

        <input
          type="text"
          placeholder="Label"
          value={formData.Label}
          onChange={(e) => setFormData({ ...formData, Label: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Class"
          value={formData.Class}
          onChange={(e) => setFormData({ ...formData, Class: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.Department}
          onChange={(e) =>
            setFormData({ ...formData, Department: e.target.value })
          }
          className="w-full p-2 border rounded mb-2"
        />

        {/* Price Field - Allow Decimal Input */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="text"
            placeholder="Price ($)"
            value={formData.Price}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, ""); // Allow numbers & decimal
              setFormData({ ...formData, Price: parseFloat(value) });
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Cost Field - Allow Decimal Input */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
          <input
            type="text"
            placeholder="Cost ($)"
            value={formData.Cost}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, ""); // Allow numbers & decimal
              setFormData({ ...formData, Cost: parseFloat(value) });
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkuForm;
