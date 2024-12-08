import axios from "../api/axios";
import { ExamCategory } from "../models/exam-catagory.model";
import { SelectOption } from "./service.types";

export async function fetchExamSubCategories(examCategoryId: string) {
  let raw = await axios.get(`/sub-exam-categories`);
  let data = raw.data as { _id: string; name: string }[];
  return data.map((subExamCat) => {
    return {
      value: subExamCat._id,
      label: subExamCat.name,
    };
  }) as SelectOption[];
}
