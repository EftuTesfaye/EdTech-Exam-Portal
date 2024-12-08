import React from "react";
import { useNavigate } from "react-router-dom";

const ViewPlainQuestion = () => {
  const navigate = useNavigate();

  const routes = [
    { label: "View Plain Questions", path: "/view-plain-questions" },
    { label: "View Directions", path: "/view-directions" },
    { label: "View Grouped Questions", path: "/view-grouped-questions" },
    { label: "View General Question", path: "/view-general-question" },
    { label: "View Exercise Questions", path: "/view-exercise-questions" },
    { label: "View Material Resource", path: "/view-material-resource" },
    { label: "View Exam Categories", path: "/view-exam-categories" },

  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold">Questions</h1>
      </div>

      <nav className="mb-4">
        <span className="text-blue-500 cursor-pointer">View Questions</span>
        <span className="mx-2"> &gt; </span>
        <span className="text-gray-500">Choose Category</span>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {routes.map((route, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 p-4"
            onClick={() => navigate(route.path)} 
          >
            {route.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewPlainQuestion;
