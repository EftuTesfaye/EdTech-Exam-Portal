import React from 'react';

const SelectCourse = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Select Course</h2>

        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-1">Course</label>
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-lg p-3"
            required
          >
            <option value="" disabled hidden>Select Course</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="natural maths">Natural Maths</option>
            <option value="social maths">Social Maths</option>
            <option value="history">History</option>
            <option value="geography">Geography</option>
            <option value="economics">Economics</option>
            <option value="general questions">General Questions</option>

          </select>
        </div>

        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-1">Grade</label>
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-lg p-3"
            required
          >
            <option value="" disabled hidden>Select Grade</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
        </div>


        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-1">Grade</label>
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-lg p-3"
            required
          >
            <option value="" disabled hidden>Select Year</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>

          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectCourse;