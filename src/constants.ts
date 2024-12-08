import { SelectOption } from "./DataService/service.types";

export const yearsOptions: SelectOption[] = [
  { label: "2017", value: "2017" },
  { label: "2016", value: "2016" },
  { label: "2015", value: "2015" },
  { label: "2014", value: "2014" },
  { label: "2013", value: "2013" },
  { label: "2012", value: "2012" },
  { label: "2011", value: "2011" },
  { label: "2010", value: "2010" },
  { label: "2009", value: "2009" },
  { label: "2008", value: "2008" },
  { label: "2007", value: "2007" },
];
export const gradeOptions: SelectOption[] = [
  { label: "Grade 9 ", value: "9" },
  { label: "Grade 10 ", value: "10" },
  { label: "Grade 11 ", value: "11" },
  { label: "Grade 12 ", value: "12" },
];

export const chapterOptions: SelectOption[] = [
  { label: "Chapter 1", value: "1" },
  { label: "Chapter 2", value: "2" },
  { label: "Chapter 3", value: "3" },
  { label: "Chapter 4", value: "4" },
  { label: "Chapter 5", value: "5" },
  { label: "Chapter 6", value: "6" },
  { label: "Chapter 7", value: "7" },
  { label: "Chapter 8", value: "8" },
  { label: "Chapter 9", value: "9" },
  { label: "Chapter 10", value: "10" },
  { label: "Chapter 11", value: "11" },
  { label: "Chapter 12", value: "12" },
  { label: "Chapter 13", value: "13" },
  { label: "Chapter 14", value: "14" },
  { label: "Chapter 15", value: "15" },
  { label: "Chapter 16", value: "16" },
];

export const answerOptions: SelectOption[] = [
  { label: "A", value: "option_a" },
  { label: "B", value: "option_b" },
  { label: "C", value: "option_c" },
  { label: "D", value: "option_d" },
];

export const coursesOptions: SelectOption[] = [
  { label: "Biology", value: "63e49541acbfccb4849b6599" },
  { label: "Physics", value: "63e49566acbfccb4849b659c" },
  { label: "Chemistry", value: "63e49586acbfccb4849b659f" },
  { label: "Natural Maths", value: "63e495a8acbfccb4849b65a2" },
  { label: "Social Maths", value: "63e495fcacbfccb4849b65a5" },
  { label: "History", value: "63e49612acbfccb4849b65a8" },
  { label: "Geography", value: "63e49622acbfccb4849b65ab" },
  { label: "Economics", value: "63e49633acbfccb4849b65ae" },
  { label: "English", value: "63e496afacbfccb4849b65b1" },
  { label: "Aptitude", value: "63e496c9acbfccb4849b65b4" },
  { label: "Civics", value: "63e496d9acbfccb4849b65b7" },
];

export const courseIdToName = (id: string) => {
  const course = coursesOptions.find((course) => course.value === id);

  if (course) return course.label;

  return "Unknown";
};
