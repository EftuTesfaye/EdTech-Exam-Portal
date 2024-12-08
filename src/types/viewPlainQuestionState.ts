import { SelectOption } from "../components/SelectDropdown";

export type ViewPlainQuestionState = {
  courses: SelectOption[];
  years: SelectOption[];
  selectedCourse: string;
  selectedYear: string | number;
  page: number;
};
export type ViewPlainQuestionAction = {
  setPlainQuestionState: (
    viewPlainQuestionState: ViewPlainQuestionState
  ) => void;
};
