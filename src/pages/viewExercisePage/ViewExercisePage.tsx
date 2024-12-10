import React, { useEffect, useState } from "react";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";
import { chapterOptions, gradeOptions } from "../../constants";
import { getAvailableExercise } from "../../DataService/exercise.service";
import { Exercise } from "../../models/exercise.model";
import { Link } from "react-router-dom";

export function ViewExercisePage() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [gradeSelected, setGradeSelected] = useState("9");
  const [chapterSelected, setChapterSelected] = useState("1");
  const [message, setMessage] = useState("Loading...");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  async function fetchInitialFromServer() {
    let data = await fetchExamCategories();

    let coursesOption = data[0].courses.map((course) => ({
      label: course.name,
      value: course._id,
    }));

    setCourses(coursesOption);
    setSelectedCourse(coursesOption[0].value);
    setGradeSelected(gradeOptions[0].value);

    const exercisesFromServer = await getAvailableExercise(
      parseInt(gradeOptions[0].value),
      coursesOption[0].value
    );

    if (exercisesFromServer.length === 0) {
      setMessage("No Data Available");
    }
    setExercises(exercisesFromServer);
  }

  useEffect(() => {
    fetchInitialFromServer();
  }, []);

  useEffect(() => {
    fetchExercises(parseInt(gradeSelected), selectedCourse);
  }, [selectedCourse, gradeSelected]);

  const fetchExercises = async (grade: number, courseId: string) => {
    const exercisesFromServer = await getAvailableExercise(grade, courseId);
    if (exercisesFromServer.length === 0) {
      setMessage("No Data Available");
    }
    setExercises(exercisesFromServer);
  };

  const handleGradeChange = (e: any) => {
    setGradeSelected(e.target.value);
  };

  const handleSelectedCourse = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block font-bold mb-1">Select Grade</label>
          <SelectDropdown
            title=""
            items={gradeOptions}
            handleSelect={handleGradeChange}
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Select Subject</label>
          <SelectDropdown
            title=""
            items={chapterOptions}
            handleSelect={handleSelectedCourse}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Grade</th>
              <th className="py-3 px-6 text-left">Chapter</th>
              <th className="py-3 px-6 text-left">Exercise No</th>
              <th className="py-3 px-6 text-left">View Questions</th>
              <th className="py-3 px-6 text-left">Manage</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {exercises.length > 0 ? (
              exercises.map((exercise, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{exercise.grade}</td>
                  <td className="py-3 px-6">{exercise.chapter}</td>
                  <td className="py-3 px-6">{exercise.exerciseNumber}</td>
                  <td className="py-3 px-6">
                    <Link
                      to={"/view-exercise-question"}
                      state={{ exerciseId: exercise._id }}
                    >
                      <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Questions</button>
                    </Link>
                  </td>
                  <td className="py-3 px-6">
                    <Link
                      to={"/exercise-info-edit"}
                      state={{ exercise }}
                    >
                      <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
                    </Link>
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">{message}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}