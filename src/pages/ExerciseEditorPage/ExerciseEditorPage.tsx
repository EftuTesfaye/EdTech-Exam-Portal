import { AxiosError } from "axios";
import { CSSProperties, useState, useEffect } from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useLocation, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

import ErrorComponent from "../../components/ErrorComponent";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { ExerciseQuestion } from "../../models/exerciseQuestion.model";
import Editor from "../../quill/Editor";
import { showSuccessToast, resolveImageURL } from "../../utils/helper";
import { answerOptions } from "../../constants";
import { updateExerciseQuestionToServer } from "../../DataService/exercise.service";

import placeholderImage from "../../assets/place_holder.jpg";
import "react-quill/dist/quill.snow.css";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function ExerciseQuestionEditorPage() {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionId, setQuestionId] = useState<string>("");
  const [exerciseQuestion, setExerciseQuestion] = useState<ExerciseQuestion>();
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

  useEffect(() => {
    const editableQuestion = location.state.question as ExerciseQuestion;
    populateForm(editableQuestion);
    setExerciseQuestion(editableQuestion);
    setQuestionId(editableQuestion._id || "");
  }, [location]);

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

  const updateExerciseQuestionToBackend = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    let editedQuestion: ExerciseQuestion = {
      questionText,
      option_a,
      option_b,
      option_c,
      option_d,
      answer: answerText,
      description,
      questionNumber: parseInt(questionNumber),
    };

    let result = await updateExerciseQuestionToServer(questionId, editedQuestion);
    setLoading(false);

    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message as Array<string>;
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
    } else {
      showSuccessToast("Updated Successfully");
    }
  };

  const populateForm = (question: ExerciseQuestion) => {
    setQuestionId(question._id || "");
    setQuestionText(question.questionText);
    setOption_a(question.option_a);
    setOption_b(question.option_b);
    setOption_c(question.option_c);
    setOption_d(question.option_d);
    setAnswerText(question.answer);
    setQuestionNumber(question.questionNumber);
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
      <div className="bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Edit Exercise Question</h2>

          {errorMessage && <span className="text-red-600">{errorMessage}</span>}

          <div className="mb-4">
            <p className="font-semibold">Question Number</p>
            <input
              type="number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <p className="font-semibold">Paste your question here</p>
            <Editor
              setValue={setQuestionTextValue}
              editorId="editor1"
              value={questionText}
            />
            <ErrorComponent value={questionText} />
          </div>

          <div className="mb-4">
            <p className="font-semibold">Select Image if the Question has Image</p>
            <img
              src={
                resolveImageURL(exerciseQuestion?.questionImage || "") ||
                tempQuestionImagePath ||
                placeholderImage
              }
              alt="Question"
              className="w-32 h-20 object-cover mb-2"
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
              <p className="font-semibold">
                Paste your option <span className="text-red-600">{option}</span> Here
              </p>
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
            <p className="font-semibold">Choose Answer here</p>
            <SelectDropdown
              title=""
              value={answerText}
              items={answerOptions}
              handleSelect={setOption_answer_Text}
            />
          </div>

          <div className="mb-4">
            <p className="font-semibold">Paste your option Description here</p>
            <Editor
              setValue={setDescription_Text}
              editorId="editor7"
              value={description}
            />
          </div>

          <div className="mb-4">
            <p className="font-semibold">Select Image if the description has Image</p>
            <img
              src={
                resolveImageURL(exerciseQuestion?.descriptionImage || "") ||
                tempDescriptionImagePath ||
                placeholderImage
              }
              alt="Description"
              className="w-32 h-20 object-cover mb-2"
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
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              onClick={updateExerciseQuestionToBackend}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => navigate(-1)}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}