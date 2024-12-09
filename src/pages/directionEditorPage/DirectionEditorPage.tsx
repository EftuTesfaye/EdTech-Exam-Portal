import { CSSProperties, useEffect, useState } from "react";
import { Direction } from "../../models/direction.model";
import { useLocation } from "react-router-dom";
import { updateDirections } from "../../DataService/editDirections.service";
import { AxiosError } from "axios";
import { Editor } from "../../quill/Editor";
import { isEmptyForRichText, showSuccessToast } from "../../utils/helper";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import ErrorComponent from "../../components/ErrorComponent";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function DirectionEditorPage() {
  const [direction, setDirection] = useState<Direction>();
  const [directionText, setDirectionText] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [passage, setPassage] = useState<string | undefined>(undefined);
  const [directionNumber, setDirectionNumber] = useState(1);
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let editableDirection = location.state.direction as Direction;
    setDirection(editableDirection);
    fillForm(editableDirection);
  }, []);

  const submitQuestionToBackend = async () => {
    let updatedDirection: Direction = {
      course: direction?.course || "",
      courseYear: parseInt(year),
      directionNumber,
      sectionName,
      directionText,
      passage,
    };
    console.log(
      "has empty field " + isEmptyForRichText(updatedDirection, "directionText")
    );

    if (isEmptyForRichText(updatedDirection, "directionText")) {
      return "";
    }
    setLoading(true);
    const result = await updateDirections(
      direction?._id || "",
      updatedDirection
    );

    if (result instanceof AxiosError) {
      //handle error
      setLoading(false);
    } else {
      //handle success
      showSuccessToast("Update success");
      setLoading(false);
    }
  };

  const fillForm = (direction: Direction) => {
    setDirectionNumber(direction.directionNumber);
    setDirectionText(direction.directionText);
    setSectionName(direction.sectionName);
    setPassage(direction.passage || "");
    setYear(direction.courseYear.toString());
  };

  const setDirection_text = (val: string) => {
    setDirectionText(val);
    console.log(val);
  };

  const setPassage_Text = (val: string) => {
    setPassage(val);
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
      <div className="flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Edit Year
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Edit Direction Section Name
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
              Fill Direction Number
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setDirectionNumber(parseInt(e.target.value))}
              value={directionNumber}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Edit your Direction Text
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
              Edit your Passage
            </label>
            <Editor
              setValue={setPassage_Text}
              value={passage || ""}
              editorId="editor2"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={submitQuestionToBackend}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}
