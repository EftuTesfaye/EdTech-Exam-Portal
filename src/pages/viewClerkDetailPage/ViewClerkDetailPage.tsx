import { FormEvent, useEffect, useState } from "react";
import SelectDropdown from "../../components/SelectDropdown";
import { BarChartComponent } from "../../components/BarChartComponent";
import {
  AllTimeData,
  ClerkCourseInsertionReport,
  fetchAllTimeDataInsertionReport,
  fetchDurationDataReport,
} from "../../DataService/clerkData.service";
import { useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function ViewClerkDetailPage() {
  const [selectedDuration, setSelectedDuration] = useState(7);
  const [username, setUsername] = useState("");
  const [clerkId, setClerkId] = useState("");
  const [intervalMessage, setIntervalMessage] = useState("Loading...");
  const [allTimeMessage, setAllTimeMessage] = useState("");
  const [durationalData, setDurationalData] = useState<ClerkCourseInsertionReport[]>([]);
  const [allTimeData, setAllTimeData] = useState<AllTimeData[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (clerkId.length > 0) {
      fetchUserReport(selectedDuration);
    }
  }, [selectedDuration]);

  useEffect(() => {
    const clerkIdFromState = location.state.clerkId;
    const username = location.state.username;

    setClerkId(clerkIdFromState);
    setUsername(username);
    fetchUserReport(7, clerkIdFromState);
    getAllTimeData(clerkIdFromState);
  }, []);

  const fetchUserReport = async (duration: string | number, clerkid?: string) => {
    const data = await fetchDurationDataReport(clerkid ? clerkid : clerkId, parseInt(duration.toString()));
    if (data.length === 0) {
      setIntervalMessage("No Data Entered in This Interval");
      return;
    }
    setDurationalData(data);
  };

  const getAllTimeData = async (cId: string) => {
    const data = await fetchAllTimeDataInsertionReport(cId);
    if (data.length === 0) {
      setAllTimeMessage("No Data Entered");
      return;
    }
    setAllTimeData(data);
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const duration = (e.target as HTMLSelectElement).value;
    setSelectedDuration(parseInt(duration));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="text-xl font-bold">View Clerk Details</p>
        <div className="mt-2">
          <SelectDropdown
            handleSelect={handleSelectChange}
            items={[
              { label: "Weekly", value: "7" },
              { label: "Monthly", value: "30" },
            ]}
            title=""
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {durationalData.length > 0 ? (
          durationalData.map((data, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th colSpan={2} className="text-left p-2">{data.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">Date</td>
                    <td className="font-bold">Amount</td>
                  </tr>
                  {data.insertions.map((insertion, i) => (
                    <tr key={index + i} className="hover:bg-gray-100">
                      <td className="p-2">{format(parseISO(insertion.createdAt), "dd, MMM yyyy")}</td>
                      <td className="p-2">{insertion.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="col-span-1">
            <span className="text-red-500">{intervalMessage}</span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold">All Time Data Insertion of {username}</h4>
        {allTimeMessage && <p className="text-red-500">{allTimeMessage}</p>}
      </div>

      <div className="mt-4">
        {allTimeData.length > 0 && <BarChartComponent data={allTimeData} />}
      </div>

      {allTimeData.length > 0 && (
        <div className="mt-4 text-lg">
          <span>
            Total Data Inserted by {username} is{" "}
            {allTimeData.reduce((sum, value) => sum + value.count, 0)}
          </span>
        </div>
      )}
    </div>
  );
}