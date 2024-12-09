import { useState, useEffect, useRef, CSSProperties } from "react";
import placeholderImage from "../../assets/place_holder.jpg";
import { AxiosError } from "axios";
import { SelectOption } from "../../DataService/service.types";
import { PlainQuestion as GroupedQuestion } from "../../models/question.model";
import SelectDropdown from "../../components/SelectDropdown";
import {
  fetchGroupedCourses,
  fetchGroupedCoursesDirectionYears,
  fetchDirectionOfCourseByYear,
} from "../../DataService/fetchCourse.service";
import { submitGroupedQuestionToServer } from "../../DataService/submit-questions.service";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { Editor } from "../../quill/Editor";
import ErrorComponent from "../../components/ErrorComponent";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function GroupedQuestionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [progressMessage, setProgressMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [directions, setDirections] = useState<SelectOption[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [years, setYears] = useState<SelectOption[]>([]);
  const [selectedYear, setSelectedYear] = useState("2015");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState<string | any>();
  const [option_a, setOption_a] = useState("");
  const [option_b, setOption_b] = useState("");
  const [option_c, setOption_c] = useState("");
  const [option_d, setOption_d] = useState("");
  const [description, setDescription] = useState("");
  const [answerText, setAnswerText] = useState("option_a");

  const isInitialMount = useRef(true);
  const [questionImage, setQuestionImage] = useState("");
  const [descriptionImage, setDescriptionImage] = useState("");
  const [tempQuestionImagePath, setTempQuestionImagePath] = useState("");
  const [tempDescriptionImagePath, setTempDescriptionImagePath] = useState("");

  const answerOptions: SelectOption[] = [
    { label: "A", value: "option_a" },
    { label: "B", value: "option_b" },
    { label: "C", value: "option_c" },
    { label: "D", value: "option_d" },
  ];

  useEffect(() => {
    getGroupedCourses();
  }, []);
  
  useEffect(() => {
    if (selectedCourse.length > 0) getGroupedCoursesYear();
  }, [selectedCourse]);
  
  useEffect(() => {
    if (selectedYear)
      getGroupedCoursesDirections(selectedCourse, parseInt(selectedYear.toString()));
  }, [selectedYear]);

  const getGroupedCourses = async () => {
    const groupedCourses = await fetchGroupedCourses();
    setCourses(groupedCourses);
    const defaultCourseId = groupedCourses[0].value;
    setSelectedCourse(defaultCourseId);
    const years = await fetchGroupedCoursesDirectionYears(defaultCourseId);
    setYears(years);
  };

  const getGroupedCoursesYear = async () => {
    setProgressMessage("Loading....");
    const years = await fetchGroupedCoursesDirectionYears(selectedCourse);
    if (years.length === 0) {
      setProgressMessage("It looks like you don't have data yet");
      return;
    }
    setProgressMessage(""); 
    setYears(years);
    setSelectedYear(years[0].value);
  };

  const getGroupedCoursesDirections = async (courseId: string, year: number) => {
    setSelectedDirection("");
    const directionsFromServer = await fetchDirectionOfCourseByYear(courseId, year);
    const defaultDirectionId = directionsFromServer[0].value;
    setSelectedDirection(defaultDirectionId);
    setDirections(directionsFromServer);
  };

  const handleCourseChange = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  const handleDirectionChange = (e: any) => {
    setSelectedDirection(e.target.value);
  };

  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value);
  };

  const handleQuestionImageChange = (e: any) => {
    setTempQuestionImagePath(URL.createObjectURL(e.target.files[0]));
    setQuestionImage(e.target.files[0]);
  };

  const handleDescriptionImageChange = (e: any) => {
    setTempDescriptionImagePath(URL.createObjectURL(e.target.files[0]));
    setDescriptionImage(e.target.files[0]);
  };

  const setQuestionTextValue = (val: string) => {
    setQuestionText(val);
  };

  const setOption_a_Text = (val: string) => {
    setOption_a(val);
  };

  const setOption_b_Text = (val: string) => {
    setOption_b(val);
  };

  const setOption_c_Text = (val: string) => {
    setOption_c(val);
  };

  const setOption_d_Text = (val: string) => {
    setOption_d(val);
  };

  const set_answer_Text = (e: any) => {
    setAnswerText(e.target.value);
  };

  const setDescription_Text = (val: string) => {
    setDescription(val);
  };

  const submitQuestionToBackend = async (e: any) => {
    setErrorMessage(""); 
    setLoading(true);
    let question: GroupedQuestion = {
      questionText,
      option_a,
      option_b,
      option_c,
      option_d,
      answer: answerText,
      description,
      courseId: selectedCourse,
      year: parseInt(selectedYear),
      direction: selectedDirection,
      questionNumber: parseInt(questionNumber),
    };

    const result = await submitGroupedQuestionToServer(
      question,
      questionImage,
      descriptionImage
    );
    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message as Array<string>;

      for (const msg of messages) {
        msgTxt += msg + " "; 
      }

      if (msgTxt !== errorMessage) {
        setErrorMessage(msgTxt);
        showErrorToast(msgTxt);
      }
    } else {
      showSuccessToast("Question Inserted successfully");
      clearForm();
    }
  };

  const clearForm = () => {
    setQuestionText("");
    setOption_a("");
    setOption_b("");
    setOption_c("");
    setOption_d("");
    const quesNum = parseInt(questionNumber || 0) + 1;
    setQuestionNumber(quesNum.toString());
    setDescription("");
    setQuestionImage("");
    setDescriptionImage("");
    setTempQuestionImagePath("");
    setTempDescriptionImagePath("");
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
      <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectDropdown
              title="Courses"
              items={courses}
              value={selectedCourse}
              handleSelect={handleCourseChange}
            />
            <SelectDropdown
              title="Years"
              items={years}
              value={selectedYear}
              handleSelect={handleYearChange}
            />
            <SelectDropdown
              title="Directions"
              items={directions}
              value={selectedDirection}
              handleSelect={handleDirectionChange}
            />
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <label className="font-bold text-green-600">Question Number</label>
              <input
                type="number"
                onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
                value={questionNumber}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              <ErrorComponent value={questionNumber} />
            </div>
            <div className="mb-4">
              <label className="font-bold text-green-600">Paste your question here</label>
              <Editor
                setValue={setQuestionTextValue}
                editorId="editor1"
                value={questionText}
              />
              <ErrorComponent value={questionText} />
            </div>
            <div className="flex items-center mb-4">
              <img
                src={tempDescriptionImagePath || placeholderImage}
                className="w-16 h-16 object-cover mr-2"
              />
              <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded">
                Choose File
                <input
                  type="file"
                  onChange={handleDescriptionImageChange}
                  className="hidden"
                />
              </label>
              <span className="ml-2">{tempDescriptionImagePath ? "No file chosen" : ""}</span>
            </div>
            {["A", "B", "C", "D"].map((option, index) => (
              <div className="mb-4" key={index}>
                <label className="font-bold text-green-600">
                  Paste your option {option} here
                </label>
                <Editor
                  setValue={index === 0 ? setOption_a_Text : index === 1 ? setOption_b_Text : index === 2 ? setOption_c_Text : setOption_d_Text}
                  value={index === 0 ? option_a : index === 1 ? option_b : index === 2 ? option_c : option_d}
                  editorId={`editor${index + 2}`}
                />
                <ErrorComponent value={index === 0 ? option_a : index === 1 ? option_b : index === 2 ? option_c : option_d} />
              </div>
            ))}
            <div className="mb-4">
              <label className="font-bold text-blue-600">Choose Answer here</label>
              <SelectDropdown
                title=""
                value={answerText}
                items={answerOptions}
                handleSelect={set_answer_Text}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold text-green-600">Paste your option Description here</label>
              <Editor
                editorId="editor6"
                setValue={setDescription_Text}
                value={description}
              />
            </div>
            <div className="mb-4">
              <label className="font-bold text-green-600">Select Image if the Description has Image</label>
              <div className="flex items-center">
                <img
                  src={tempDescriptionImagePath || placeholderImage}
                  className="w-16 h-16 object-cover mr-2"
                />
                <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded">
                  Choose File
                  <input
                    type="file"
                    onChange={handleDescriptionImageChange}
                    className="hidden"
                  />
                </label>
                <span className="ml-2">{tempDescriptionImagePath ? "No file chosen" : ""}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                onClick={submitQuestionToBackend}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}