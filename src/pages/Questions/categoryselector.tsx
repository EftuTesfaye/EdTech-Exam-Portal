import React, { useState } from 'react';

const CategorySelector = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Choose Category</h2>

      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">
          Exam Questions
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">
          Exercise Questions
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">
          General Questions
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">
          Exam Questions
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 mb-4 w-full max-w-lg">
        <select
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="" disabled>Select Course</option>
          <option value="Biology">Biology</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Physics">Physics</option>
        </select>

        <select
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3"
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
        >
          <option value="" disabled>Select Sub Category</option>
          <option value="Chapter 1">Chapter 1</option>
          <option value="Chapter 2">Chapter 2</option>
          <option value="Chapter 3">Chapter 3</option>
          <option value="Chapter 4">Chapter 4</option>
        </select>

        <select
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 p-3"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>Select Year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none">
        View
      </button>
    </div>
  );
};

export default CategorySelector;