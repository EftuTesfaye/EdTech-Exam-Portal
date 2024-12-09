import { CSSProperties, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import {
  createExamCategories,
  updateExamCategories,
} from "../../DataService/fetchExamCatagories.service";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export const ExamCategoryPage = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("generalQuestion");
  const [message, setErrorMessage] = useState("");
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableExamCategory, setEditableExamCategory] = useState<any>(null);

  useEffect(() => {
    const editableExamCategoryState = location.state?.examCategory;

    if (editableExamCategoryState) {
      setIsEditMode(true);
      setEditableExamCategory(editableExamCategoryState);
      setName(editableExamCategoryState.name);
      setCategory(editableExamCategoryState.category);
    }
  }, []);

  const submitCategory = async () => {
    setLoading(true);

    if (!name || !category) return;

    let examCategory: any = {
      name,
      category,
    };
    console.log(examCategory);

    let result;
    if (!isEditMode) {
      result = await createExamCategories(examCategory);
    } else {
      result = await updateExamCategories(
        editableExamCategory?._id ?? "",
        examCategory
      );
    }
    setLoading(false);

    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message ||
        (["Something went wrong. Try again later."] as Array<string>);
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      showSuccessToast("Request Success");
    }
  };

  return (
    <LoadingOverlayWrapper
      active={loading}
      spinner={
        <FadeLoader
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    >
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded shadow-md p-6">
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              value={name}
              placeholder="Geography"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <ErrorComponent value={name} />
          </div>

          {/* Category Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <input
              readOnly
              value={category}
              placeholder="General_Question"
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <ErrorComponent value={category} />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-start">
            <button
              onClick={submitCategory}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow mr-4"
            >
              Submit
            </button>

            <Link to={"/admin-user/view-exam-category"} state={{}}>
              <button className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded shadow">
                Back to View Exam Category
              </button>
            </Link>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
};
