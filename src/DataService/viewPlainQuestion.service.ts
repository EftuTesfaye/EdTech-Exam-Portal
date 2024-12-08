import axios from "../api/axios";
import { PlainQuestion } from "../models/question.model";
type GetQuestionDto = {
  questions: PlainQuestion[];
  count: number;
};
type getQuestionsQuery = {
  course: number | string;
  year: number | string;
  subCategory?: number | string;
  page?: number | string;
  limit?: number | string;
};
export async function fetchPlainQuestions({
  course,
  year,
  page,
}: getQuestionsQuery) {
  let req: any = {
    course: course.toString(),
    year: parseInt(year.toString()),
    page: parseInt(page?.toString() || "1"),
  };

  let raw = await axios.post(`/questions/for-admin`, req, {});
  let data = raw.data;
  return data as GetQuestionDto;
}
