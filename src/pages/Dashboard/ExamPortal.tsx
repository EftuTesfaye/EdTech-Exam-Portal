import React, { useEffect, useState, FormEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Clerk } from "../../models/clerks.model";
import { getClerksAndDataInfoFromServer } from "../../DataService/clerkData.service";
import { format, parseISO } from "date-fns";
import CardDataStats from "../../components/CardDataStats";

const AdminDashboard: React.FC = () => {
  const [clerks, setClerks] = useState<Clerk[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const navigate = useNavigate();

  const getClerksAndDataInfo = async () => {
    const { clerks, totalData } = await getClerksAndDataInfoFromServer();
    setClerks(clerks);
    setTotalData(totalData);
  };

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

  useEffect(() => {
    getClerksAndDataInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <section className="flex justify-end p-6 bg-gray-800">
        <div className="flex gap-4">
          <CardDataStats title="Total Data Entries" total={totalData.toString()} big />
          <CardDataStats
            title="Total Balance"
            total={(clerks.reduce((sum, c) => sum + c.questionsEntered * 3.5, 0)).toFixed(2)}
            small
          />
        </div>
      </section>

      <div className="px-6 py-4 bg-gray-800 flex-1">
        <h1 className="text-2xl font-bold mb-4">Data Encoders and Statistics</h1>
        <table className="table-auto w-full bg-gray-700 text-left text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-600">No.</th>
              <th className="px-4 py-2 border-b border-gray-600">Registration Date</th>
              <th className="px-4 py-2 border-b border-gray-600">User Name</th>
              <th className="px-4 py-2 border-b border-gray-600">Total Data Inserted</th>
              <th className="px-4 py-2 border-b border-gray-600">Total Balance</th>
              <th className="px-4 py-2 border-b border-gray-600">View Details</th>
            </tr>
          </thead>
          <tbody>
            {clerks.length > 0 ? (
              clerks.map((clerk, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {format(parseISO(clerk.createdAt), "dd, MMM yyyy")}
                  </td>
                  <td className="px-4 py-2">{clerk.username}</td>
                  <td className="px-4 py-2">{clerk.questionsEntered}</td>
                  <td className="px-4 py-2">
                    <strong>{(clerk.questionsEntered * 3.5).toFixed(2)}</strong>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to="/view-clerk-detail"
                      state={{
                        clerkId: clerk.adminId ? clerk.adminId : clerk._id,
                        username: clerk.username,
                      }}
                    >
                      <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td colSpan={3} className="px-4 py-2 font-bold">Total Data In Database</td>
              <td className="px-4 py-2 font-bold">{totalData}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
