import axios from "axios";
import { Exercise } from "../models/exercise.model";

export async function updateExerciseInfoToServer(
  exercise: Exercise,
  exerciseId: string
) {
  try {
    let raw = await axios.post(`/exercise/update/${exerciseId}`, exercise);
    let data = raw.data as Exercise;
    console.log(data);
  } catch (error) {
    console.log(error);
    return error;
  }
}
