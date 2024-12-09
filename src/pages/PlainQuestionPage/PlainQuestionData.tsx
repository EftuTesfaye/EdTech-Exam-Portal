import { CSSProperties, useEffect, useState } from "react";
import placeholderImage from "../../assets/place_holder.jpg";
import "react-quill/dist/quill.snow.css";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { fetchExamSubCategories } from "../../DataService/fetchSubExamCategory";
import { PlainQuestion } from "../../models/question.model";
import { submitPlainQuestionToServer } from "../../DataService/submit-questions.service";
import { AxiosError } from "axios";
import { FadeLoader } from "react-spinners";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { yearsOptions } from "../../constants";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { Editor } from "../../quill/Editor";
import ErrorComponent from "../../components/ErrorComponent";
import { Course } from "../../models/exam-catagory.model";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function PlainQuestionData() {
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [examCategories, setExamCategories] = useState<SelectOption[]>([]);
  const [selectedExamCategory, setSelectedExamCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubExamCategory, setSelectedSubExamCategory] = useState("");
  const [year, setYear] = useState("2015");
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [subExamCategory, setSubExamCategory] = useState<SelectOption[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [option_a, setOption_a] = useState("");
  const [option_b, setOption_b] = useState("");
  const [option_c, setOption_c] = useState("");
  const [option_d, setOption_d] = useState("");
  const [description, setDescription] = useState("");
  const [answerText, setAnswerText] = useState("option_a");
  const [questionImage, setQuestionImage] = useState("");
  const [descriptionImage, setDescriptionImage] = useState("");
  const [tempQuestionImagePath, setTempQuestionImagePath] = useState("");
  const [tempDescriptionImagePath, setTempDescriptionImagePath] = useState("");
  const [questionNumber, setQuestionNumber] = useState<string | any>(1);
  const [show, setShow] = useState(false);

  const answerOptions: SelectOption[] = [
    { label: "A", value: "option_a" },
    { label: "B", value: "option_b" },
    { label: "C", value: "option_c" },
    { label: "D", value: "option_d" },
  ];

  useEffect(() => {
    fetchInitialFromServer();
  }, []);

  async function fetchInitialFromServer() {
    let data = await fetchExamCategories();
    let examCatsOption = [];

    for (const examCat of data) {
      if (examCat?.category === "")
        examCatsOption.push({ label: examCat.name, value: examCat._id });
    }
    setExamCategories(examCatsOption.reverse());
    let UEECourses = data.find((e) => e._id === "63a2ecdeee469ea43cdacbac");
    let crs: SelectOption[] = [];

    if (UEECourses) {
      for (const course of UEECourses.courses) {
        if (!course.hasDirections) {
          crs.push({ label: course.name, value: course._id });
        }
      }
      setSelectedExamCategory(UEECourses?._id || "");
      setCourses(crs);
      setSelectedCourse(crs[0].value.toString());

      const subExamCats = await fetchExamSubCategories(UEECourses?._id || "");
      setSubExamCategory(subExamCats);
      setSelectedSubExamCategory(subExamCats[0].value);
    }
  }

  const handleExamCategoryChange = (e: any) => {
    setSelectedExamCategory(e.target.value);
  };

  const handleCourseChange = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubExamCategoryChange = (e: any) => {
    setSelectedSubExamCategory(e.target.value);
  };

  const handleYearsChange = (e: any) => {
    setYear(e.target.value);
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

  const setOption_a_Text = (val: string) => setOption_a(val);
  const setOption_b_Text = (val: string) => setOption_b(val);
  const setOption_c_Text = (val: string) => setOption_c(val);
  const setOption_d_Text = (val: string) => setOption_d(val);
  const setOption_answer_Text = (e: any) => setAnswerText(e.target.value);
  const setDescription_Text = (val: string) => setDescription(val);

  const submitGroupedQuestionToBackend = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    let question: PlainQuestion = {
      questionText,
      option_a,
      option_b,
      option_c,
      option_d,
      answer: answerText,
      description,
      course: selectedCourse,
      year,
      questionNumber: parseInt(questionNumber),
    };

    let result = await submitPlainQuestionToServer(question, questionImage, descriptionImage);
    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = result.response?.data?.message.join(" ") || "Something went wrong, try again later.";
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setShow(true);
      showSuccessToast("Request successful.");
      clearForm();
    }
  };

  const clearForm = () => {
    setQuestionText("");
    setOption_a("");
    setOption_b("");
    setOption_c("");
    setOption_d("");
    setQuestionNumber((prev: string) => parseInt(prev) + 1);
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
      <div className="p-6 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-lg font-semibold">Exam Category</label>
            <SelectDropdown
              title=""
              items={examCategories}
              value={selectedExamCategory.toString()}
              handleSelect={handleExamCategoryChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Courses</label>
            <SelectDropdown
              title=""
              items={courses}
              value={selectedCourse}
              handleSelect={handleCourseChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Sub Category</label>
            <SelectDropdown
              title=""
              items={subExamCategory}
              value={selectedSubExamCategory}
              handleSelect={handleSubExamCategoryChange}
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="block text-lg font-semibold mr-4">Select Year</label>
            <SelectDropdown
              title=""
              items={yearsOptions}
              value={year.toString()}
              handleSelect={handleYearsChange}
            />
            <label className="ml-4 block text-lg font-semibold">Question Number</label>
            <input
              type="number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
              className="ml-2 p-2 border border-gray-300 rounded w-16 text-center"
            />
            <ErrorComponent value={questionNumber} />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Paste Your Question Here</label>
            <Editor
              setValue={setQuestionTextValue}
              value={questionText}
              editorId="editor1"
            />
            <ErrorComponent value={questionText} />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Select Image if the Question has Image</label>
            <div className="flex items-center">
              <img src={tempQuestionImagePath || placeholderImage} className="w-24 h-24 object-cover mr-2" />
              <label htmlFor="questionImage" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
                Choose File
                <input
                  type="file"
                  id="questionImage"
                  onChange={handleQuestionImageChange}
                  className="hidden"
                />
              </label>
              <span className="ml-2">{tempQuestionImagePath ? "" : "No file chosen"}</span>
            </div>
          </div>
          {['A', 'B', 'C', 'D'].map((option, index) => (
            <div className="mb-4" key={option}>
              <label className="block text-lg font-semibold">
                Paste Your Option {option} Here
              </label>
              <Editor
                setValue={
                  index === 0 ? setOption_a_Text :
                  index === 1 ? setOption_b_Text :
                  index === 2 ? setOption_c_Text : setOption_d_Text
                }
                value={
                  index === 0 ? option_a :
                  index === 1 ? option_b :
                  index === 2 ? option_c : option_d
                }
                editorId={`editor${index + 2}`}
              />
              <ErrorComponent value={
                index === 0 ? option_a :
                index === 1 ? option_b :
                index === 2 ? option_c : option_d
              } />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Choose Answer Here</label>
            <SelectDropdown
              title=""
              items={answerOptions}
              value={answerText}
              handleSelect={setOption_answer_Text}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Paste Your Option Description Here</label>
            <Editor
              setValue={setDescription_Text}
              editorId="editor6"
              value={description}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Select Image if the Description has Image</label>
            <div className="flex items-center">
              <img src={tempDescriptionImagePath || placeholderImage} className="w-24 h-24 object-cover mr-2" />
              <label htmlFor="descriptionImage" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
                Choose File
                <input
                  type="file"
                  id="descriptionImage"
                  onChange={handleDescriptionImageChange}
                  className="hidden"
                />
              </label>
              <span className="ml-2">{tempDescriptionImagePath ? "" : "No file chosen"}</span>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={submitGroupedQuestionToBackend}
            >
              Submit
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}