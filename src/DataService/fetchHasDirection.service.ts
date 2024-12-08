import axios from "../api/axios";
//import { ExamCategory } from "../models/exam-catagory.model";
import { SelectOption } from "./service.types";

export async function fetchHasDirection(examCategoryId: string) {
  let raw = await axios.get(`/exam-categorie`);
  let data = raw.data as { _id: string; name: string }[];
  return data.map((hasDirection) => {
    return {
      value: hasDirection._id,
      label: hasDirection.name,
    };
  }) as SelectOption[];
}
