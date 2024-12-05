import React, { useState } from 'react';

const ChallengeForm: React.FC = () => {
  const [label, setLabel] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ label, category, startDate, endDate, isActive });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 p-4">
      <h2 className="text-3xl font-bold mb-6">Challenge Form</h2>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="label">
            Challenge Label:
          </label>
          <input
            type="text"
            id="label"
            className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          {label === '' && <p className="text-red-500 text-sm">Field must be filled</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category:
          </label>
          <input
            type="number"
            id="category"
            className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          {category === '' && <p className="text-red-500 text-sm">Field must be filled</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="start-date">
            Challenge Start Date:
          </label>
          <input
            type="date"
            id="start-date"
            className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="end-date">
            Challenge End Date:
          </label>
          <input
            type="date"
            id="end-date"
            className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="is-active"
            className="mr-2"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <label className="text-gray-700" htmlFor="is-active">
            Make Challenge Active
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none">
            Back To view Exam Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;