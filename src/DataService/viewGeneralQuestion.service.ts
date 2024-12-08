import axios from "../api/axios";
import { GeneralQuestion } from "../models/general.model";
type GetQuestionDto = {
  questions: GeneralQuestion[];
  count: number;
};

export async function fetchGeneralQuestions(
  page: number,
  examCategory: string
) {
  let raw = await axios.get(`/general-questions/${examCategory}?page=${page}`);
  let data = raw.data;
  return data as GetQuestionDto;
}
