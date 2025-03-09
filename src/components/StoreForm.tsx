// Store form component
// This component is used to add or edit a store. It contains a form with fields for ID, Label, City, and State. The form is prefilled with the data of the selected store when editing. The user can submit the form to add or update the store. 
// The form also includes validation to ensure that the required fields are filled.  
import React, { useState, useEffect } from "react";
import Button from "./Button"; 
import { StoreItem } from "../types";

interface StoreFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (store: StoreItem) => void;
  initialData?: StoreItem | null;
}

const StoreForm: React.FC<StoreFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Omit<StoreItem, "SeqNo">>({
    ID: "",
    Label: "",
    City: "",
    State: "",
  });

  // Populate form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        ID: initialData.ID,
        Label: initialData.Label,
        City: initialData.City,
        State: initialData.State,
      });
    } else {
      setFormData({ ID: "", Label: "", City: "", State: "" });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.ID || !formData.Label) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit({ ...formData, SeqNo: initialData ? initialData.SeqNo : Date.now() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{initialData ? "Edit Store" : "Add Store"}</h2>
        <input
          type="text"
          placeholder="ID"
          value={formData.ID}
          onChange={(e) => setFormData({ ...formData, ID: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          disabled={!!initialData} // Prevent ID changes during updates
        />
        <input
          type="text"
          placeholder="Label"
          value={formData.Label}
          onChange={(e) => setFormData({ ...formData, Label: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="City"
          value={formData.City}
          onChange={(e) => setFormData({ ...formData, City: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="State"
          value={formData.State}
          onChange={(e) => setFormData({ ...formData, State: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
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

export default StoreForm;
