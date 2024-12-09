import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import {
  isEmptyForRichText,
  override,
  showSuccessToast,
} from "../../utils/helper";
import ErrorComponent from "../../components/ErrorComponent";
import Editor from "../../quill/Editor";
import { useLocation, useNavigate } from "react-router-dom";
import { Exercise } from "../../models/exercise.model";
import { updateExerciseInfoToServer } from "../../DataService/editExerciseInfo.service";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";

export default function ExerciseInfoEdit() {
  const [grade, setGrade] = useState("");
  const [chapter, setChapter] = useState("");
  const [gradeSelected, setGradeSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [course, setCourse] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapterSelected, setChapterSelected] = useState("");
  const [exerciseNumber, setExerciseNumber] = useState(Number);
  const [loading, setLoading] = useState(false);
  const [exerciseInfo, setExerciseInfo] = useState<Exercise>();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let editableExerciseInfo = location.state.exercise as Exercise;
    setExerciseInfo(editableExerciseInfo);
    fillForm(editableExerciseInfo);
  }, []);

  const submitExerciseQuestionInfoToBackend = async () => {
    let updateExerciseQuestionInfo: Exercise = {
      chapter: parseInt(chapterSelected),
      grade: parseInt(gradeSelected),
      courseId: selectedCourse,
      exerciseNumber: exerciseNumber,
    };

    console.log(
      "has empty field " +
        isEmptyForRichText(updateExerciseQuestionInfo, "exerciseInfo")
    );

    if (isEmptyForRichText(updateExerciseQuestionInfo, "exerciseInfo")) {
      return "";
    }
    const result = await updateExerciseInfoToServer(
      updateExerciseQuestionInfo,
      exerciseInfo?._id || ""
    );
  };

  const setGrade_Number = (val: string) => {
    setGrade(val);
  };
  const setChapter_Number = (val: string) => {
    setChapter(val);
  };

  const setExercise_Number = (val: number) => {
    setExerciseNumber(val);
  };

  const fillForm = (exercise: Exercise) => {
    setChapter(chapter);
    setExerciseNumber(exercise.exerciseNumber);
    setGrade(grade);
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
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800 mb-2">
              Edit your Exercise number here
            </p>
            <Editor setValue={setChapter} value={chapter} editorId="editor1" />
            <ErrorComponent value={chapter} />
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800 mb-2">
              Edit your Grade here
            </p>
            <Editor
              setValue={setGrade_Number}
              value={grade}
              editorId="editor2"
            />
            <ErrorComponent value={grade} />
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800 mb-2">
              Exercise Number
            </p>
            <input
              type="number"
              value={exerciseNumber}
              onChange={(e) => setExerciseNumber(parseInt(e.target.value))}
              className="block w-full px-4 py-2 border rounded-md text-gray-800 border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={submitExerciseQuestionInfoToBackend}
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition duration-200"
            >
              Back To View Questions
            </button>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}
