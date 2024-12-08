export type Course = {
  courses: any;
  years: any;
  _id: string;
  name: string;
  hasDirections: boolean;
};
export type ExamCategory = {
  _id: string;
  name: string;
  courses: Course[];
  category?: string;
};
