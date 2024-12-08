import { createContext } from "react";
import {
  ViewPlainQuestionState,
  ViewPlainQuestionAction,
} from "../types/viewPlainQuestionState";

export const ViewPlainQuestionContext = createContext<
  ViewPlainQuestionState & ViewPlainQuestionAction
>({
  courses: [],
  years: [],
  page: 1,
  selectedCourse: "",
  selectedYear: "",
  setPlainQuestionState: (viewPlainQuestionState: ViewPlainQuestionState) => {},
});
