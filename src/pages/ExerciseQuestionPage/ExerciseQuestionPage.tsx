import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { CSSProperties, useEffect, useState } from "react";
import { Editor } from "../../quill/Editor";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";
import { ExerciseQuestion } from "../../models/exerciseQuestion.model";
import { answerOptions, gradeOptions, chapterOptions as co } from "../../constants";
import { submitExerciseQuestionToServer } from "../../DataService/exercise.service";
import placeholderImage from "../../assets/place_holder.jpg";
import "react-quill/dist/quill.snow.css";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function ExerciseQuestionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("9");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("1");
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
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
  const [questionNumber, setQuestionNumber] = useState<string | any>("");
  const [chapterOptions] = useState<SelectOption[]>(co);
  const [show, setShow] = useState(false);

  async function fetchInitialFromServer() {
    const data = await fetchExamCategories();
    const coursesOption = [];
    const UEECourses = data.find((c) => c._id === "63a2ecdeee469ea43cdacbac");
    for (const course of UEECourses?.courses ?? []) {
      coursesOption.push({ label: course.name, value: course._id });
    }
    setCourses(coursesOption);
    setSelectedCourse(coursesOption[0].value);
    setSelectedGrade(gradeOptions[0].value);
    setSelectedChapter(chapterOptions[0].value.toString());
  }

  useEffect(() => {
    fetchInitialFromServer();
  }, []);

  function handleQuestionImageChange(e: any) {
    setTempQuestionImagePath(URL.createObjectURL(e.target.files[0]));
    setQuestionImage(e.target.files[0]);
  }

  function handleDescriptionImageChange(e: any) {
    setTempDescriptionImagePath(URL.createObjectURL(e.target.files[0]));
    setDescriptionImage(e.target.files[0]);
  }

  const setQuestionTextValue = (val: string) => setQuestionText(val);
  const setOption_a_Text = (val: string) => setOption_a(val);
  const setOption_b_Text = (val: string) => setOption_b(val);
  const setOption_c_Text = (val: string) => setOption_c(val);
  const setOption_d_Text = (val: string) => setOption_d(val);
  const setOption_answer_Text = (e: any) => setAnswerText(e.target.value);
  const setDescription_Text = (val: string) => setDescription(val);

  const submitExerciseQuestionPageToBackend = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    let exercise: ExerciseQuestion = {
      questionText,
      option_a,
      option_b,
      option_c,
      option_d,
      answer: answerText,
      description,
      questionNumber,
      courseId: selectedCourse,
      grade: parseInt(selectedGrade),
      chapter: parseInt(selectedChapter),
    };

    let result = await submitExerciseQuestionToServer(exercise);
    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message || ["Something is wrong, try again later"];
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setShow(true);
      showSuccessToast("Request Success");
      clearForm();
    }
  };

  const clearForm = () => {
    setQuestionText("");
    setOption_a("");
    setOption_b("");
    setOption_c("");
    setOption_d("");
    const quesNum = parseInt(questionNumber || 0);
    setQuestionNumber(quesNum + 1);
    setDescription("");
    setQuestionImage("");
    setDescriptionImage("");
    setTempQuestionImagePath("");
    setTempDescriptionImagePath("");
  };

  const handleCourseChange = (e: any) => setSelectedCourse(e.target.value);
  const handleGradeChange = (e: any) => setSelectedGrade(e.target.value);
  const handleExerciseChange = (e: any) => setSelectedChapter(e.target.value);

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
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Select Course, Grade and Chapter</h2>
            <div className="flex space-x-4">
              <SelectDropdown
                title=""
                items={courses}
                value={selectedCourse}
                handleSelect={handleCourseChange}
              />
              <SelectDropdown
                title=""
                items={gradeOptions}
                value={selectedGrade}
                handleSelect={handleGradeChange}
              />
              <SelectDropdown
                title=""
                items={chapterOptions}
                value={selectedChapter}
                handleSelect={handleExerciseChange}
              />
            </div>
          </div>

          {errorMessage.length > 0 && (
            <span className="text-red-600 text-xl">{errorMessage}</span>
          )}

          <div className="mb-4">
            <label className="block text-lg font-semibold">Question Number</label>
            <input
              type="number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
              className="border border-gray-300 rounded p-2 w-full"
            />
            <ErrorComponent value={questionNumber} />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">Paste your question here</label>
            <Editor
              setValue={setQuestionTextValue}
              editorId="editor1"
              value={questionText}
            />
            <ErrorComponent value={questionText} />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">Select Image if the Question has Image</label>
            <img
              src={tempQuestionImagePath || placeholderImage}
              id="photo"
              className="w-32 h-32 object-cover mb-2"
            />
            <input
              type="file"
              id="file"
              onChange={handleQuestionImageChange}
              className="border border-gray-300 rounded p-2"
            />
          </div>

          {['A', 'B', 'C', 'D'].map((option, index) => (
            <div key={option} className="mb-4">
              <label className="block text-lg font-semibold">
                Paste your option <span className="text-red-600 font-bold">{option}</span> Here
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
            <label className="block text-lg font-semibold">Paste your option Description here</label>
            <Editor
              setValue={setDescription_Text}
              editorId="editor6"
              value={description}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold">
              Select Image if the description has Image
            </label>
            <img
              src={tempDescriptionImagePath || placeholderImage}
              className="w-32 h-32 object-cover mb-2"
            />
            <input
              type="file"
              id="file"
              onChange={handleDescriptionImageChange}
              className="border border-gray-300 rounded p-2"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded mr-4"
              onClick={submitExerciseQuestionPageToBackend}
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