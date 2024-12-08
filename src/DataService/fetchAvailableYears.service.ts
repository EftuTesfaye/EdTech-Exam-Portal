import axios from "../api/axios";
import { SelectOption } from "../components/SelectDropdown";

type yearDto = {
  year: number;
};
export async function fetchAvailableYears(courseId: number | string) {
  let raw = await axios.get(`/questions/courses/get-years/${courseId}`);
  let data = raw.data as yearDto[];
  if (data.length == 0) return [];

  return data.map((d) => ({ label: d.year, value: d.year })) as SelectOption[];
}
