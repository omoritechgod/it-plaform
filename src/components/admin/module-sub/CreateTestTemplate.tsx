import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTestTemplate: React.FC = () => {
  const [testName, setTestName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      title: "Test 1",
      description: "Description for Test 1",
      status: "Active",
    },
    {
      id: 2,
      title: "Test 2",
      description: "Description for Test 2",
      status: "Pending",
    },
    {
      id: 3,
      title: "Test 3",
      description: "Description for Test 3",
      status: "Inactive",
    },
    {
      id: 4,
      title: "Test 4",
      description: "Description for Test 4",
      status: "Active",
    },
  ]);

  const handleCreate = async () => {
    if (!testName) {
      toast.error("Please enter a test name");
      return;
    }
    if (!duration) {
      toast.error("Please enter a valid duration");
      return;
    }

  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    setDummyData((prevData) => prevData.filter((item) => item.id !== id));
    toast.success("Card deleted successfully!");
  };

  // Handle Edit
  const handleEdit = (id: number) => {
  const itemToEdit = dummyData.find((item) => item.id === id);
  if (!itemToEdit) return;

  const newTitle = prompt("Enter new test title", itemToEdit.title);

  if (!newTitle) return;

  setDummyData((prevData) =>
    prevData.map((item) =>
      item.id === id ? { ...item, title: newTitle } : item
    )
  );

  toast.success("Card updated successfully!");
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4 mt-20">
        <h1 className="text-2xl font-bold mb-6">Create New Test Template</h1>

        <div className="mb-4">
          <label
            htmlFor="testName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Test Name
          </label>
          <input
            id="testName"
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="e.g. JavaScript Basics"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          className="w-full border p-2 rounded mb-4"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value ? parseInt(e.target.value) : "")
          }
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className={`w-full p-2 rounded transition ${
            loading
              ? "bg-blue-600 text-white opacity-70 cursor-not-allowed"
              : "bg-blue-600 text-black hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Test"}
        </button>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-2 gap-6 mt-10">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            <span
              className={`text-sm font-medium ${getStatusColor(item.status)}`}
            >
              {item.status}
            </span>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEdit(item.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTestTemplate;
