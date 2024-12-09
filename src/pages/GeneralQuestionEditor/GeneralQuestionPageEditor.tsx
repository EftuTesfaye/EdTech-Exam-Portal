import { CSSProperties, useEffect, useState } from "react";
import placeholderImage from "../../assets/place_holder.jpg";

import "react-quill/dist/quill.snow.css";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";

import { AxiosError } from "axios";
import { FadeLoader } from "react-spinners";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useLocation, useNavigate } from "react-router-dom";
import { resolveImageURL, showSuccessToast } from "../../utils/helper";

import { Editor } from "../../quill/Editor";
import ErrorComponent from "../../components/ErrorComponent";

import { GeneralQuestion } from "../../models/general.model";
import { updateGeneralQuestionToServer } from "../../DataService/editQuestion.service";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function GeneralQuestionPageEditor() {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [generalQuestion, setGeneralQuestion] = useState<GeneralQuestion>();
  const [loading, setLoading] = useState(false);
  const [questionId, setQuestionId] = useState<string>("");
  const [showErrorToast, setShowErrorToast] = useState(false);
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
  const [show, setShow] = useState(false);

  const answerOptions: SelectOption[] = [
    { label: "A", value: "option_a" },
    { label: "B", value: "option_b" },
    { label: "C", value: "option_c" },
    { label: "D", value: "option_d" },
  ];

  useEffect(() => {
    let editableQuestion = location.state.question as GeneralQuestion;
    populateForm(editableQuestion);
    setGeneralQuestion(editableQuestion);
    setQuestionId(editableQuestion._id || "");
  }, []);

  function handleQuestionImageChange(e: any) {
    console.log(e.target.files);
    setTempQuestionImagePath(URL.createObjectURL(e.target.files[0]));
    setQuestionImage(e.target.files[0]);
  }

  function handleDescriptionImageChange(e: any) {
    console.log(e.target.files);
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

  const updateGeneralQuestionToBackend = async (e: any) => {
    e.preventDefault();
    setLoading((prev) => true);
    setErrorMessage("");
    let editedQuestion: GeneralQuestion = {
      questionText,
      option_a: option_a,
      option_b: option_b,
      option_c: option_c,
      option_d: option_d,
      answer: answerText,
      description: description,
      questionNumber: parseInt(questionNumber),
      questionImage,
      descriptionImage,
    };

    console.log(editedQuestion);

    let result = await updateGeneralQuestionToServer(
      questionId,
      editedQuestion
    );
    setLoading((prev) => false);

    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message as Array<string>;
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      setShowErrorToast(true);
    } else {
      showSuccessToast("updated success");
    }
  };

  const populateForm = (question: GeneralQuestion) => {
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
    console.log("this is desc from server" + question.descriptionImage);
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
      <div className="bg-gray-100 min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold mb-2">Question Number</p>
              <input
                type="number"
                value={questionNumber}
                onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <p className="text-lg font-semibold mb-2">Paste your question here</p>
              <Editor
                setValue={setQuestionTextValue}
                editorId="editor1"
                value={questionText}
              />
              <ErrorComponent value={questionText} />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold mb-2">Select Image if the Question has Image</p>
              <img
                src={resolveImageURL(generalQuestion?.questionImage || "") || tempQuestionImagePath || placeholderImage}
                className="w-32 h-20 object-cover"
              />
              <input
                type="file"
                onChange={handleQuestionImageChange}
                className="border py-1 px-2 rounded"
              />
            </div>
          </div>

          {['A', 'B', 'C', 'D'].map((opt, index) => (
            <div key={opt} className="space-y-2">
              <p className="text-lg font-semibold mb-2">Paste your option {opt}</p>
              <Editor
                setValue={(val) => {
                  index === 0
                    ? setOption_a_Text(val)
                    : index === 1
                    ? setOption_b_Text(val)
                    : index === 2
                    ? setOption_c_Text(val)
                    : setOption_d_Text(val);
                }}
                value={index === 0 ? option_a : index === 1 ? option_b : index === 2 ? option_c : option_d}
                editorId={`editor${index + 2}`}
              />
            </div>
          ))}

          <div className="mt-4 flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={updateGeneralQuestionToBackend}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() =>
                navigate("/admin-user/view-general-question", {
                  state: { initialPage: location.state?.initialPage },
                  replace: true,
                })
              }
            >
              Back To View Questions
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}
