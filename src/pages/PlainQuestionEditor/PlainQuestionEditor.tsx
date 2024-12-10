import { CSSProperties, useContext, useEffect, useState } from "react";
import placeholderImage from "../../assets/place_holder.jpg";
import "react-quill/dist/quill.snow.css";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";

import { PlainQuestion } from "../../models/question.model";
import { AxiosError } from "axios";
import { FadeLoader } from "react-spinners";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../utils/helper";
import {
  updateGroupedQuestionToServer,
  updatePlainQuestionToServer,
} from "../../DataService/editQuestion.service";
import { Editor } from "../../quill/Editor";
import ErrorComponent from "../../components/ErrorComponent";
import { ViewPlainQuestionContext } from "../../context/viewPlainQuestionContext";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function PlainQuestionEditor() {
  const viewPlainQuestionState = useContext(ViewPlainQuestionContext);
  const { setPlainQuestionState, ...pureState } = viewPlainQuestionState;
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState<PlainQuestion>();
  const [loading, setLoading] = useState(false);
  const [isGroupedQuestion, setIsGroupedQuestion] = useState(false);
  const [questionId, setQuestionId] = useState<string>("");
  const [directionId, setDirectionId] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [year, setYear] = useState("2015");
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
  const [questionNumber, setQuestionNumber] = useState<number | any>();
  const navigate = useNavigate();
  
  const answerOptions: SelectOption[] = [
    { label: "A", value: "option_a" },
    { label: "B", value: "option_b" },
    { label: "C", value: "option_c" },
    { label: "D", value: "option_d" },
  ];

  useEffect(() => {
    const editableQuestion = location.state.question as PlainQuestion;
    populateForm(editableQuestion);
    setQuestion(editableQuestion);
    if (editableQuestion.direction && editableQuestion.direction.length > 0) {
      setIsGroupedQuestion(true);
      setDirectionId(editableQuestion.direction);
    }
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

  const updatePlainQuestionToBackend = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    let editedQuestion: PlainQuestion = {
      questionText,
      option_a,
      option_b,
      option_c,
      option_d,
      answer: answerText,
      description,
      course: selectedCourse,
      year,
      questionNumber,
    };

    let result = null;
    if (!isGroupedQuestion) {
      result = await updatePlainQuestionToServer(
        questionId || "",
        editedQuestion,
        questionImage,
        descriptionImage
      );
    } else {
      editedQuestion.direction = directionId;
      result = await updateGroupedQuestionToServer(
        questionId || "",
        editedQuestion,
        questionImage,
        descriptionImage
      );
    }
    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = result.response?.data?.message.join(" ") || "Error occurred";
      setErrorMessage(msgTxt);
    } else {
      showSuccessToast("Updated successfully");
    }
  };

  const populateForm = (question: PlainQuestion) => {
    setQuestionId(question._id || "");
    setSelectedCourse(question.course || "");
    setQuestionText(question.questionText);
    setOption_a(question.option_a);
    setOption_b(question.option_b);
    setOption_c(question.option_c);
    setOption_d(question.option_d);
    setQuestionNumber(question.questionNumber);
    setAnswerText(question.answer);
    setYear(question.year.toString());
    setDescription(question.description);
    setQuestionImage(question.questionImage || "");
    setDescriptionImage(question.descriptionImage || "");
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
            <label className="block text-lg font-semibold">Question Number</label>
            <input
              type="number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
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
            <p className="text-lg font-semibold">Select Image if the Question has Image</p>
            <div className="flex items-center">
              <img
                src={tempDescriptionImagePath || placeholderImage}
                className="w-24 h-24 object-cover mr-2"
              />
              <label htmlFor="file" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
                Choose File
                <input
                  type="file"
                  id="file"
                  onChange={handleDescriptionImageChange}
                  className="hidden"
                />
              </label>
              <span className="ml-2">{tempDescriptionImagePath ? "" : "No file chosen"}</span>
            </div>
          </div>
          {['A', 'B', 'C', 'D'].map((option, index) => (
            <div className="mb-4" key={option}>
              <label className="block text-lg font-semibold">
                Paste your option {option} Here
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
            <label className="block text-lg font-semibold">Choose Answer here</label>
            <SelectDropdown
              title=""
              value={answerText}
              items={answerOptions}
              handleSelect={setOption_answer_Text}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Edit Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Paste your option Description here</label>
            <Editor
              setValue={setDescription_Text}
              editorId="editor7"
              value={description}
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={updatePlainQuestionToBackend}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => {
                const path = isGroupedQuestion ?
                  "/view-grouped-questions" :
                  "/view-plain-questions";
                navigate(path, { state: { course: viewPlainQuestionState.selectedCourse, year: viewPlainQuestionState.selectedYear, page: viewPlainQuestionState.page }, replace: true });
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}