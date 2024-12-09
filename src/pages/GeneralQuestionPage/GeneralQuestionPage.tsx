import { CSSProperties, useEffect, useState } from "react";
import { Editor } from "../../quill/Editor";
import { GeneralQuestion } from "../../models/general.model";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { submitGeneralQuestionToServer } from "../../DataService/submit-questions.service";
import { AxiosError } from "axios";
import ErrorComponent from "../../components/ErrorComponent";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import placeholderImage from "../../assets/place_holder.jpg";
import "react-quill/dist/quill.snow.css";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function GeneralQuestionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [examCategories, setExamCategories] = useState<SelectOption[]>([]);
  const [selectedExamCategory, setSelectedExamCategory] = useState("");
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
  const [questionNumber, setQuestionNumber] = useState<string | any>();
  const [show, setShow] = useState(false);

  const answerOptions: SelectOption[] = [
    { label: "A", value: "option_a" },
    { label: "B", value: "option_b" },
    { label: "C", value: "option_c" },
    { label: "D", value: "option_d" },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let data = await fetchExamCategories();
    let examCatsOption = [];
    for (const examCat of data) {
      if (examCat?.category && examCat?.category === "generalQuestion")
        examCatsOption.push({ label: examCat.name, value: examCat._id });
    }
    if (examCatsOption.length === 0) return;
    setExamCategories(examCatsOption);
    setSelectedExamCategory(examCatsOption[0].value);
  };

  const handleQuestionImageChange = (e: any) => {
    setTempQuestionImagePath(URL.createObjectURL(e.target.files[0]));
    setQuestionImage(e.target.files[0]);
  };

  const handleDescriptionImageChange = (e: any) => {
    setTempDescriptionImagePath(URL.createObjectURL(e.target.files[0]));
    setDescriptionImage(e.target.files[0]);
  };

  const setQuestionTextValue = (val: string) => setQuestionText(val);
  const setOption_a_Text = (val: string) => setOption_a(val);
  const setOption_b_Text = (val: string) => setOption_b(val);
  const setOption_c_Text = (val: string) => setOption_c(val);
  const setOption_d_Text = (val: string) => setOption_d(val);
  const setOption_answer_Text = (e: any) => setAnswerText(e.target.value);
  const setDescription_Text = (val: string) => setDescription(val);

  const handleExamCategoryChange = (e: any) => {
    setSelectedExamCategory(e.target.value);
  };

  const submitGeneralQuestionPageToBackend = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    let general: GeneralQuestion = {
      questionText,
      option_a,
      option_b,
      option_c,
      option_d,
      answer: answerText,
      description,
      questionImage,
      descriptionImage,
      examCategory: selectedExamCategory,
      questionNumber: parseInt(questionNumber),
    };

    let result = await submitGeneralQuestionToServer(general, questionImage, descriptionImage);
    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message || ["Something is wrong, try again later"];
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setShow(true);
      showSuccessToast("Request successful");
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
      <div className="bg-black p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-green-600 font-bold text-xl mb-4">Select Category</h2>
          <SelectDropdown
            title=""
            items={examCategories}
            value={selectedExamCategory.toString()}
            handleSelect={handleExamCategoryChange}
          />
          
          <h2 className="text-green-600 font-bold mt-4">Question Number</h2>
          <input
            type="number"
            value={questionNumber}
            onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
            className="border border-gray-300 rounded p-2 w-24 mt-2"
          />

          <h2 className="text-green-600 font-bold mt-4">Paste your question here</h2>
          <Editor
            setValue={setQuestionTextValue}
            editorId="editor1"
            value={questionText}
          />
          <ErrorComponent value={questionText} />

          <h2 className="text-green-600 font-bold mt-4">Choose Question Image</h2>
          <div className="flex items-center mb-4">
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

          {['A', 'B', 'C', 'D'].map((option, index) => (
            <div key={option} className="mb-4">
              <h2 className="text-green-600 font-bold">
                Paste your option <span className="text-blue-600 font-bold">{option}</span> here
              </h2>
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

          <h2 className="text-blue-600 font-bold mt-4">Choose Answer here</h2>
          <SelectDropdown
            title=""
            items={answerOptions}
            handleSelect={setOption_answer_Text}
          />

          <h2 className="text-green-600 font-bold mt-4">Paste your option Description here</h2>
          <Editor
            setValue={setDescription_Text}
            editorId="editor6"
            value={description}
          />

          <h2 className="text-green-600 font-bold mt-4">Choose Description Image</h2>
          <div className="flex items-center mb-4">
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

          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded mr-4"
              onClick={submitGeneralQuestionPageToBackend}
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