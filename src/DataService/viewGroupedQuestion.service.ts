import axios from "../api/axios";
import { PlainQuestion } from "../models/question.model";

export async function fetchGroupedQuestions(directionId: string) {
  let raw = await axios.post(`/grouped-questions/for-admin`, { directionId });
  let data = raw.data;
  return data as PlainQuestion[];
}
