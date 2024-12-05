import React, { FormEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CardDataStats from "../../components/CardDataStats";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleDropdownChange = (e: FormEvent<HTMLSelectElement>) => {
    const path = (e.target as HTMLSelectElement).value;
    if (path) {
      navigate(path);
    }
  };

  const logout = () => {
    localStorage.removeItem("coydoeAdminUser");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <section className="flex justify-end p-6 bg-gray-800">
        <div className="flex gap-4">
          <CardDataStats title="Total Views" total="2456" big>
          </CardDataStats>

          <CardDataStats title="Total Balance" total="3,456" small>
          </CardDataStats>
        </div>
      </section>

   

      <section className="bg-gray-700 py-6 px-6">
        <div className="flex gap-6">
          <select
            onChange={handleDropdownChange}
            className="w-64 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Data Insertion</option>
            <option value="/admin-user/plain-question">Plain Question</option>
            <option value="/grouped-question">Group Question</option>
            <option value="/direction">Insert Directions</option>
          </select>

          <select
            onChange={handleDropdownChange}
            className="w-64 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Data Viewing</option>
            <option value="/admin-user">Plain Question</option>
            <option value="/view-directions">View Directions</option>
            <option value="/admin-user">Grouped Question</option>
            <option value="/view-general-questions">View General Question</option>
            <option value="/view-exercise-questions">View Exercise Question</option>
          </select>
        </div>
      </section>

      <div className="px-6 py-4 bg-gray-800 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
