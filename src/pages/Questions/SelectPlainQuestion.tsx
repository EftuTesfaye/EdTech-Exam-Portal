import React from 'react';

const SelectPlainQuestion = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold">Questions</h1>
      
      </div>
      
      <nav className="mb-4">
        <span className="text-blue-500 cursor-pointer">Add New Question</span>
        <span className="mx-2"> &gt; </span>
        <span className="text-gray-500">Choose Category</span>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          "Insert Exit Exam Questions",
          "Insert Exercise Questions",
          "Insert Group Questions",
          "Insert Plain Questions",
          "Insert Directions"
        ].map((category, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 p-4"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectPlainQuestion;