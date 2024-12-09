import React, { useEffect, useState } from "react";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";
import ErrorComponent from "../../components/ErrorComponent";
import { Exercise } from "../../models/exercise.model";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { submitExerciseToServer } from "../../DataService/exercise.service";
import { chapterOptions, gradeOptions } from "../../constants";

export default function ExercisePage() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [exerciseNumber, setExerciseNumber] = useState(1);
  const [gradeSelected, setGradeSelected] = useState("9");
  const [chapterSelected, setChapterSelected] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  async function fetchInitialFromServer() {
    let data = await fetchExamCategories();

    let coursesOption = [];
    for (const course of data[0].courses) {
      coursesOption.push({ label: course.name, value: course._id });
    }
    setCourses(coursesOption);
    setSelectedCourse(coursesOption[0].value);
  }

  useEffect(() => {
    fetchInitialFromServer();
  }, []);

  const handleGradeChange = (e: any) => {
    setGradeSelected(e.target.value);
  };

  const handleSelectedCourse = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  const handleSelectChapterChange = (e: any) => {
    setChapterSelected(e.target.value);
    console.log("chapter selected " + chapterSelected);
  };

  const submitExercise = async () => {
    let exercise: Exercise = {
      chapter: parseInt(chapterSelected),
      grade: parseInt(gradeSelected),
      courseId: selectedCourse,
      exerciseNumber: exerciseNumber,
    };
    console.log(exercise);

    let result = await submitExerciseToServer(exercise);
    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message ||
        (["Something is wrong. Try again later."] as Array<string>);
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setShow(true);
      showSuccessToast("Request Success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <SelectDropdown
              title=""
              items={gradeOptions}
              value={gradeSelected}
              handleSelect={handleGradeChange}
            />
          </div>
          <div>
            <SelectDropdown
              title=""
              items={courses}
              value={selectedCourse}
              handleSelect={handleSelectedCourse}
            />
          </div>
          <div>
            <SelectDropdown
              title=""
              items={chapterOptions}
              value={chapterSelected}
              handleSelect={handleSelectChapterChange}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white rounded shadow-md p-6 mb-8">
        <p className="text-sm font-medium text-gray-700 mb-2">Exercise Number</p>
        <input
          type="number"
          value={exerciseNumber}
          onChange={(e) => setExerciseNumber(parseFloat(e.target.value))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <ErrorComponent value={exerciseNumber.toString()} />
      </div>
      <div>
        <button
          onClick={submitExercise}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
