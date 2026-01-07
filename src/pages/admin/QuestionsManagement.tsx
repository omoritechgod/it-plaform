import React, { useState } from "react";
import { toast } from "react-toastify";

const QuestionsManagement: React.FC = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is React?",
      options: [
        "A backend framework",
        "A JavaScript library",
        "A database",
        "A programming language",
      ],
      correctAnswer: "A JavaScript library",
    },
    {
      id: 2,
      question: "Which hook is used for state?",
      options: ["useFetch", "useEffect", "useState", "useRef"],
      correctAnswer: "useState",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  // Delete question
  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.success("Question deleted");
  };

  // Open edit modal
  const handleEdit = (id: number) => {
    const questionToEdit = questions.find((q) => q.id === id);
    if (questionToEdit) {
      setEditData(questionToEdit);
      setIsEditing(true);
    }
  };

  // Save edited question
  const saveEdit = () => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === editData.id ? { ...editData } : q
      )
    );
    setIsEditing(false);
    toast.success("Question updated");
  };

  // Add new question
  const handleAddQuestion = () => {
    if (
      !newQuestion.question ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.correctAnswer
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setQuestions((prev) => [
      ...prev,
      { ...newQuestion, id: prev.length + 1 },
    ]);
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setIsAdding(false);
    toast.success("Question added");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Question Management</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Question
          </button>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white p-5 rounded-lg shadow"
            >
              <h2 className="font-semibold mb-2">
                {index + 1}. {q.question}
              </h2>

              <ul className="text-sm mb-3 space-y-1">
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={`p-2 rounded ${
                      opt === q.correctAnswer
                        ? "bg-green-100 text-green-700 font-medium"
                        : "bg-gray-100"
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(q.id)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Question</h2>
            <input
              type="text"
              placeholder="Question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            {newQuestion.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const updatedOptions = [...newQuestion.options];
                  updatedOptions[i] = e.target.value;
                  setNewQuestion({ ...newQuestion, options: updatedOptions });
                }}
                className="w-full border p-2 rounded mb-2"
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              value={newQuestion.correctAnswer}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  correctAnswer: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Question</h2>
            <input
              type="text"
              value={editData.question}
              onChange={(e) =>
                setEditData({ ...editData, question: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            {editData.options.map((opt: string, i: number) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => {
                  const updatedOptions = [...editData.options];
                  updatedOptions[i] = e.target.value;
                  setEditData({ ...editData, options: updatedOptions });
                }}
                className="w-full border p-2 rounded mb-2"
              />
            ))}
            <button
              onClick={saveEdit}
              className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsManagement;