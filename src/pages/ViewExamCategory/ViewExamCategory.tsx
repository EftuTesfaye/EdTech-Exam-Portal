import React, { useEffect, useState } from "react";
import { ExamCategory } from "../../models/exam-catagory.model";
import {
  fetchExamCategories,
  deleteExamCategory,
} from "../../DataService/fetchExamCatagories.service";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";

export default function ViewExamCategory() {
  const [examCatagories, setExamCatagories] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    setLoading(true);
    let data = await fetchExamCategories();
    const filteredExamCategories = data.filter(
      (examCat) => examCat?.category === "generalQuestion"
    );
    setLoading(false);
    setExamCatagories(filteredExamCategories);
  };

  const _deleteExamCategory = async (id: string) => {
    let result: any = await deleteExamCategory(id);

    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message || ["Something went wrong, try again later"];
      for (const msg of messages) {
        msgTxt += msg + " "; // Concatenate array of error messages
      }
      showErrorToast();
    } else {
      setExamCatagories((prev) => prev.filter((q) => q._id !== id));
      showSuccessToast("Request Success");
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {!loading && examCatagories.length > 0 ? (
              examCatagories.map((examCategory, index) => (
                <tr className="hover:bg-gray-100" key={examCategory._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{examCategory.name}</td>
                  <td className="border border-gray-300 p-2">{examCategory.category}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex space-x-2">
                      <Link
                        to={"/edit-exam-category"}
                        state={{ examCategory }}
                      >
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => _deleteExamCategory(examCategory._id || "")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : loading ? (
              <tr>
                <td colSpan={4} className="text-center">Loading...</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No exam categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}