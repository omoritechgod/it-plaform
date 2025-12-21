import React from "react";
import { Button } from "../common/Button";
import { motion } from "framer-motion";
import { Input } from "../common/Input";
import { Send } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import adminService from "../../services/admin.service";

interface CreateCohortModalProps {
  setShowCreateModal: (show: boolean) => void;
  showCreateModal?: boolean;
}

const ApplicationForm = ({
  setShowCreateModal,
  showCreateModal,
}: CreateCohortModalProps) => {
  const [formConfig, setFormConfig] = React.useState<{
    cohort_id: string;
    form_schema: {
      fields: { name: string; type: string }[];
      agreement_text: string;
    };
  }>({
    cohort_id: "",
    form_schema: {
      fields: [],
      agreement_text: "i agree to the terms and conditions",
    },
  });
  const [previewMode, setPreviewMode] = React.useState<boolean>(false);
  const [newfields, setNewFields] = React.useState<{
    name: string;
    type: string;
  }>({
    name: "",
    type: "",
  });

  const addField = () => {
    if (newfields.name && newfields.type && formConfig.cohort_id) {
      setFormConfig((prev) => ({
        ...prev,
        form_schema: {
          ...prev.form_schema,
          fields: [...prev.form_schema.fields, newfields],
        },
      }));

      setPreviewMode(true);
      setTimeout(() => {
        setPreviewMode(false);
      }, 5000);
      toast.success("Field added successfully");
    } else {
      toast.error("Please provide both field name and type");
    }
    setNewFields({ name: "", type: "" });
  };

  const mutation = useMutation({
    mutationFn: async (data: typeof formConfig) => {
      const res = await adminService.createApply(data);
      return res;
    },
  });

  React.useEffect(() => {
    if (showCreateModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCreateModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formConfig, {
      onSuccess: () => {
        toast.success("Application form created successfully");
        setShowCreateModal(false);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create application form");
      },
    });
    console.log("Form Config Submitted:", formConfig);
    setFormConfig({
      cohort_id: "",
      form_schema: {
        fields: [],
        agreement_text: "i agree to the terms and conditions",
      },
    });

    // setShowCreateModal(false);
  };

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 left-0 bottom-0 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex space-x-3 pb-4">
          <button
            onClick={handleSubmit}
            type="button"
            className="flex-1 transition-all hover:shadow-xl bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 flex items-center justify-center"
          >
            Create Apply form <Send className="w-4 h-4 ml-2" />
          </button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCreateModal(false)}
          >
            Cancel
          </Button>
        </div>
        <Input
          className="mb-2"
          label="Cohort ID"
          value={formConfig.cohort_id}
          onChange={(e) =>
            setFormConfig({ ...formConfig, cohort_id: e.target.value })
          }
          placeholder="Cohort ID"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Name
          </label>
          <Input
            placeholder="e.g., Full Name"
            value={newfields.name}
            required
            onChange={(e) =>
              setNewFields({ ...newfields, name: e.target.value })
            }
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Type
          </label>
          <select
            value={newfields.type}
            required
            onChange={(e) =>
              setNewFields({ ...newfields, type: e.target.value })
            }
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select field type</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
        </div>
        <button
          onClick={() => addField()}
          type="button"
          className="w-full mt-4 bg-gradient-to-r from-[#0f266c] rounded-md to-[#007bff] text-white hover:from-[#0a1d52] p-3 hover:to-[#0056b3] focus:ring-blue-500 shadow-lg hover:shadow-xl"
        >
          Save Field
        </button>
      </motion.div>
      {previewMode && (
        <div className="fixed top-10 right-10 bg-white p-4 rounded-lg shadow-lg z-60 w-80">
          <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
          {formConfig.form_schema.fields.map((field, index) => (
            <div key={index} className="mb-4 flex items-center gap-2">
              <span className="flex gap-2 items-center text-sm font-medium text-gray-700 mb-1">
                {field.name}
              </span>
              <span> - </span>
              <span className="block text-sm font-medium text-gray-700 mb-1">
                {field.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
