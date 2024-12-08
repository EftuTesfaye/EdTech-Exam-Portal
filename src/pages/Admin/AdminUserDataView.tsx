import { FormEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminNotification from "../../components/AdminNotification";

export default function AdminUserDataView() {
  const navigate = useNavigate();

  const handleRouteChange = (e: FormEvent<HTMLSelectElement>) => {
    const path = (e.target as HTMLSelectElement).value;
    if (path) navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("coydoeAdminUser");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between bg-blue-500 p-4 text-white shadow-md">
        <div className="flex items-center space-x-4">
          <Link
            to=""
            className="text-lg font-semibold hover:underline"
          >
            Clerks
          </Link>
          <AdminNotification />
        </div>
        <button
          onClick={logout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      <div className="flex justify-center bg-gray-200 py-4 shadow-inner dark:bg-gray-700">
        <div className="flex space-x-6">
          <select
            onChange={handleRouteChange}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-blue-500"
          >
            <option value="">Data Insertion</option>
            <option value="/admin-user/plain-question">Plain Question</option>
            <option value="grouped-question">Group Question</option>
            <option value="direction">Insert Directions</option>
          </select>

          <select
            onChange={handleRouteChange}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-blue-500"
          >
            <option value="">Data Viewing</option>
            <option value="admin-user">Plain Question</option>
            <option value="view-directions">View Directions</option>
            <option value="admin-user">Grouped Question</option>
            <option value="view-general-questions">View General Question</option>
            <option value="view-exercise-questions">View Exercise Question</option>
          </select>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
}
