import { AxiosError } from "axios";
import axios from "../api/axios";
import { Direction } from "../models/direction.model";
import { PlainQuestion } from "../models/question.model";
import { GeneralQuestion } from "../models/general.model";
import { Exercise } from "src/models/exercise.model";
//import { ExerciseQuestion } from "src/models/exercise.model";

export async function submitPlainQuestionToServer(
  question: PlainQuestion,
  questionImage: string,
  descriptionImage: string
) {
  try {
    let formData = new FormData();
    formData.append("questionText", question.questionText);
    formData.append("answer", question.answer);
    formData.append("year", question.year.toString());
    formData.append("option_a", question.option_a);
    formData.append("option_b", question.option_b);
    formData.append("option_c", question.option_c);
    formData.append("option_d", question.option_d);
    formData.append(
      "questionNumber",
      question?.questionNumber?.toString() || "0"
    );
    formData.append("course", question?.course || "");
    formData.append("description", question.description);
    formData.append("questionImage", questionImage);
    console.log("image set to form data");

    formData.append("descriptionImage", descriptionImage);

    console.log(questionImage);

    let raw = await axios.post(`/questions/create`, formData);
    let data = raw.data as PlainQuestion;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitGroupedQuestionToServer(
  question: PlainQuestion,
  questionImage: string,
  descriptionImage: string
) {
  try {
    let formData = new FormData();
    formData.append("questionText", question.questionText);
    formData.append("answer", question.answer);
    formData.append("year", question.year.toString());
    formData.append("option_a", question.option_a);
    formData.append("option_b", question.option_b);
    formData.append("option_c", question.option_c);
    formData.append("option_d", question.option_d);
    formData.append(
      "questionNumber",
      question?.questionNumber?.toString() || "0"
    );
    formData.append("courseId", question?.courseId || "");
    formData.append("direction", question?.direction || "");
    formData.append("description", question.description);
    formData.append("questionImage", questionImage);
    console.log("image set to form data");

    formData.append("descriptionImage", descriptionImage);

    let raw = await axios.post(`/grouped-questions/create`, formData);
    let data = raw.data as PlainQuestion;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitDirectionToServer(direction: Direction) {
  try {
    let raw = await axios.post(`/directions/create`, direction);
    let data = raw.data as Direction;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return error;
  }
}

export async function submitGeneralQuestionToServer(
  question: GeneralQuestion,
  questionImage: string,
  descriptionImage: string
) {
  let formData = new FormData();
  try {
    formData.append("questionText", question.questionText);
    formData.append("answer", question.answer);
    formData.append("option_a", question.option_a);
    formData.append("option_b", question.option_b);
    formData.append("option_c", question.option_c);
    formData.append("option_d", question.option_d);
    formData.append(
      "questionNumber",
      question?.questionNumber?.toString() || "0"
    );

    formData.append("description", question.description);
    formData.append("questionImage", questionImage);

    formData.append("descriptionImage", descriptionImage);

    console.log("befoire printing option AAAAAAAAAAAAAAAAAAAAA");
    console.log(question.option_a);

    console.log("after printing option AAAAAAAAAAAAAAAAAAAAA");
    for (const val of formData.values()) {
      console.log("values are " + val);
    }
    console.log();

    let raw = await axios.post(`/general-questions`, question);
    let data = raw.data as GeneralQuestion;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// export async function submitExerciseQuestionToServer(
//   question: ExerciseQuestion,
//   questionImage: string,
//   descriptionImage: string
// ) {
//   try {
//     let formData = new FormData();
//     formData.append("questionText", question.questionText);
//     formData.append("exerciseNumber", question.exerciseNumber);
//     formData.append("chapter", question.chapter);
//     formData.append("grade", question.grade);
//     formData.append("answer", question.answer);
//     formData.append("option_a", question.option_a);
//     formData.append("option_b", question.option_b);
//     formData.append("option_c", question.option_c);
//     formData.append("option_d", question.option_d);
//     formData.append(
//       "questionNumber",
//       question?.questionNumber?.toString() || "0"
//     );

//     formData.append("description", question.description);
//     formData.append("questionImage", questionImage);
//     console.log("image set to form data");

//     formData.append("descriptionImage", descriptionImage);

//     console.log(questionImage);

//     let raw = await axios.post(`/exercise-questions`, formData);
//     let data = raw.data as ExerciseQuestion;
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }
