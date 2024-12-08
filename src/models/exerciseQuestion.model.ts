export type ExerciseQuestion = {
  _id?: string;
  exerciseId?: string;
  questionText: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  description: string;
  questionNumber?: number;
  direction?: string;
  questionImage?: string;
  descriptionImage?: string;
  courseId?: string;
  grade?: number;
  chapter?: number;
};
