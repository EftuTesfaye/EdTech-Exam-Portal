import axios from "../api/axios";
import { ExerciseQuestion } from "../models/exerciseQuestion.model";
type GetQuestionDto = {
  questions: ExerciseQuestion[];
  count: number;
};

export async function fetchExerciseQuestions(exerciseId: string | any) {
  let raw = await axios.get(`/exercise-questions/${exerciseId}`);
  let data = raw.data;
  return data as ExerciseQuestion[];
}
