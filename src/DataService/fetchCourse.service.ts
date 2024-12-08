import axios from "../api/axios";
import { Direction } from "../models/direction.model";
import { SelectOption } from "./service.types";

export async function fetchGroupedCourses() {
  let raw = await axios.get(`/courses/get/all?type=grouped`);
  let data = raw.data as { _id: string; name: string }[];
  console.log("fetch grouped ------------------$$$$$$$$$$$$$$$$$$$ courses");

  console.log(data);

  return data.map((c) => ({ label: c.name, value: c._id })) as SelectOption[];
}

export async function fetchGroupedCoursesDirectionYears(courseId: string) {
  let raw = await axios.get(`/directions/get/years/${courseId}`);
  let data = raw.data as { year: number }[];
  console.log(data);
  console.log(courseId);

  return data.map((y) => ({
    label: y.year.toString(),
    value: y.year.toString(),
  })) as SelectOption[];
}

export async function fetchDirectionOfCourseByYear(
  courseId: string,
  year: number
) {
  let raw = await axios.post(`/directions`, { courseId, year });
  let data = raw.data as Direction[];
  const result= data.map((d) => ({
    label: d.sectionName,
    value: d._id,
  })) as SelectOption[];
  console.log("helllo "+courseId+" year--"+year);
  
  console.log(result);
  
  return result;
}

export async function fetchDirectionOfCourseByYearAsArray(
  courseId: string,
  year: number
) {
  let raw = await axios.post(`/directions`, { courseId, year });
  let data = raw.data as Direction[];
  return data;
}
