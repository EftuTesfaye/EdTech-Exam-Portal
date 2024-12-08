export type GeneralQuestion = {
  _id?: string;
  examCategory?: string;
  questionText: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  description: string;

  questionNumber?: number;

  questionImage?: string;
  descriptionImage?: string;
};
