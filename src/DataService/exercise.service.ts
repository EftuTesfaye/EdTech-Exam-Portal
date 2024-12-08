import { Exercise } from "../models/exercise.model";
import axios from "../api/axios";
import { ExerciseQuestion } from "../models/exerciseQuestion.model";
import { SelectOption } from "./service.types";
import { AxiosError } from "axios";

export async function submitExerciseToServer(exercise: Exercise) {
  try {
    let raw = await axios.post(`/exercises/create`, exercise);
    let data = raw.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function submitExerciseQuestionToServer(
  question: ExerciseQuestion
) {
  try {
    let raw = await axios.post("/exercise-questions/create", question);
    let data = raw.data;
    return data;
  } catch (error) {
    return error;
  }
}

export async function getExerciseQuestionFromServer({
  courseId = "",
  grade = 9,
  page = 1,
  size = 10,
}: {
  grade: number;
  courseId: string;
  page: number;
  size: number;
}): Promise<any> {
  try {
    const raw = await axios.post("/exercise-questions/get", {
      courseId,
      grade,
      page,
      size,
    });
    const data = raw.data as { questions: ExerciseQuestion[]; total: number };
    console.log(data);
    return data;
  } catch (error) {
    return error as AxiosError;
  }
}
export async function updateExerciseQuestionToServer(
  id: string,
  question: ExerciseQuestion | any
) {
  try {
    let raw = await axios.put(`/exercise-questions/${id}`, question);
    let data = raw.data;
    return data;
  } catch (error) {
    return error;
  }
}
export async function getAvailableExerciseFromServer(
  grade: number,
  courseId: string
) {
  try {
    let raw = await axios.post("/exercises/get-all", { grade, courseId });
    let data = raw.data as Exercise[];
    if (data.length == 0) return [];
    return data.map((exercise) => ({
      label: `Exercise ${exercise.exerciseNumber}`,
      value: exercise._id,
    })) as SelectOption[];
  } catch (error) {
    return error;
  }
}
export async function getAvailableExercise(grade: number, courseId: string) {
  let raw = await axios.post("/exercises/get-all", { grade, courseId });
  let data = raw.data as Exercise[];
  if (data.length == 0) return [];
  return data;
}
