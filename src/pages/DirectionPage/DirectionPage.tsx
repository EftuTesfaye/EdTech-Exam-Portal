import { CSSProperties, useEffect, useState } from "react";
import { fetchGroupedCourses } from "../../DataService/fetchCourse.service";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";

import { Direction } from "../../models/direction.model";
import { submitDirectionToServer } from "../../DataService/submit-questions.service";
import { yearsOptions } from "../../constants";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { Editor } from "../../quill/Editor";
import ErrorComponent from "../../components/ErrorComponent";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function DirectionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [directionText, setDirectionText] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [passage, setPassage] = useState<string | undefined>(undefined);
  const [directionNumber, setDirectionNumber] = useState(1);
  const [year, setYear] = useState(2015);

  useEffect(() => {
    fetchCoursesFromServer();
  }, []);

  const fetchCoursesFromServer = async () => {
    let coursesFromServer = await fetchGroupedCourses();
    setCourses(coursesFromServer);
    setSelectedCourse(coursesFromServer[0].value);
  };

  const submitQuestionToBackend = async () => {
    let direction: Direction = {
      course: selectedCourse,
      courseYear: parseInt(year.toString()),
      directionNumber,
      sectionName,
      directionText,
      passage,
    };
    setLoading(true);
    setErrorMessage("");
    const result = await submitDirectionToServer(direction);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message ||
        (["Something went wrong. Try again later"] as Array<string>);
      for (const msg of messages) msgTxt += msg + " "; // concatenate array of error messages
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setLoading(false);
      showSuccessToast("Direction inserted successfully");
    }
  };

  const handleCourseChange = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  const setDirection_text = (val: string) => {
    setDirectionText(val);
  };

  const setPassage_Text = (val: string) => {
    setPassage(val);
  };

  const handleYearsChange = (e: any) => {
    setYear(e.target.value);
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
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        {/* Header Section */}
        <div className="w-full max-w-4xl bg-white rounded shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <SelectDropdown
                title="Courses"
                items={courses}
                value={selectedCourse}
                handleSelect={handleCourseChange}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Select Year
              </label>
              <SelectDropdown
                title=""
                items={yearsOptions}
                value={year}
                handleSelect={handleYearsChange}
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-4xl bg-white rounded shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fill Section Number Here
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setDirectionNumber(parseInt(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Paste Section Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setSectionName(e.target.value)}
              value={sectionName}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Paste your Direction Text Here
            </label>
            <Editor
              setValue={setDirection_text}
              value={directionText}
              editorId="editor1"
            />
            <ErrorComponent value={directionText} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Paste your Passage Here (if any)
            </label>
            <Editor
              setValue={setPassage_Text}
              value={passage || ""}
              editorId="editor2"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              onClick={submitQuestionToBackend}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}
