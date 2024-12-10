import placeholderImage from "../../assets/place_holder.jpg";
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import { Link, useLocation } from "react-router-dom";
import {
  resolveImageURL,
  showErrorToast,
  showSuccessToast,
} from "../../utils/helper";
import { deleteExerciseQuestion } from "../../DataService/editQuestion.service";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ExerciseQuestion } from "../../models/exerciseQuestion.model";
import CustomPagination from "../../components/pagination";
import SelectDropdown from "../../components/SelectDropdown";
import { fetchExerciseQuestions } from "../../DataService/viewExerciseQuestion.service";
import { coursesOptions, gradeOptions } from "../../constants";
import { getExerciseQuestionFromServer } from "../../DataService/exercise.service";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      return <span>{domToReact(domNode.children)}</span>;
    }
  },
};

export default function ViewExerciseQuestionPage() {
  const location = useLocation();
  let [initialPage, setInitialPage] = useState(location.state?.initialPage || 1);
  const [selectedGrade, setSelectedGrade] = useState("9");
  const [selectedCourse, setSelectedCourse] = useState(coursesOptions[0].value);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("Loading...");
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    getQuestion();
  }, [selectedCourse, selectedGrade]);

  const onPageChange = async (page: number) => {
    const { questions, total } = await getExerciseQuestionFromServer({
      courseId: selectedCourse,
      grade: parseInt(selectedGrade),
      page: page,
      size: 10,
    });

    setInitialPage(page);
    setQuestions(questions);
    setTotalCount(total);
  };

  const getQuestion = async (page: number = 1) => {
    const { questions, total } = await getExerciseQuestionFromServer({
      courseId: selectedCourse,
      grade: parseInt(selectedGrade),
      page: page,
      size: 10,
    });

    if (Array.isArray(questions) && questions.length === 0) {
      setMessage("No Questions inserted Yet For this Grade and Course");
      return;
    }

    setQuestions(Array.isArray(questions) ? questions : []);
    setTotalCount(total || 0);
  };

  const handleCourseChange = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  const handleGradeChange = (e: any) => {
    setSelectedGrade(e.target.value);
  };

  const deleteExerciseQuestionFromServer = async (questionId: string) => {
    let result: any = await deleteExerciseQuestion(questionId);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message || ["Something went wrong, try again later"];
      for (const msg of messages) {
        msgTxt += msg + " "; // concatenate array of error messages
      }
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
      showSuccessToast("Request Success");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <SelectDropdown
          title=""
          value={selectedCourse}
          items={coursesOptions}
          handleSelect={handleCourseChange}
        />
        <SelectDropdown
          title=""
          items={gradeOptions}
          value={selectedGrade}
          handleSelect={handleGradeChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Chapter</th>
              <th className="py-3 px-6 text-left">Questions</th>
              <th className="py-3 px-6 text-left">Option 'A'</th>
              <th className="py-3 px-6 text-left">Option 'B'</th>
              <th className="py-3 px-6 text-left">Option 'C'</th>
              <th className="py-3 px-6 text-left">Option 'D'</th>
              <th className="py-3 px-6 text-left">Ans</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Que Img</th>
              <th className="py-3 px-6 text-left">Des Img</th>
              <th className="py-3 px-6 text-left">Manage</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {questions.length > 0
              ? questions.map((question, index) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
                    <td className="py-3 px-6">{question?.questionNumber}</td>
                    <td className="py-3 px-6">{question?.chapter}</td>
                    <td className="py-3 px-6">{parse(question.questionText, options)}</td>
                    <td className="py-3 px-6">{parse(question.option_a, options)}</td>
                    <td className="py-3 px-6">{parse(question.option_b, options)}</td>
                    <td className="py-3 px-6">{parse(question.option_c, options)}</td>
                    <td className="py-3 px-6">{parse(question.option_d, options)}</td>
                    <td className="py-3 px-6">{question.answer}</td>
                    <td className="py-3 px-6">{parse(question?.description || "", options)}</td>
                    <td className="py-3 px-6">
                      <img
                        className="max-w-xs h-auto"
                        src={resolveImageURL(question.questionImage || "") || placeholderImage}
                        alt="Question"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <img
                        className="max-w-xs h-auto"
                        src={resolveImageURL(question.descriptionImage || "") || placeholderImage}
                        alt="Description"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <Link
                        to={"/edit-exercise-question"}
                        state={{ question }}
                      >
                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Edit</button>
                      </Link>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2"
                        onClick={() => deleteExerciseQuestionFromServer(question._id || "")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : <tr><td colSpan={12} className="text-center">{message}</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <CustomPagination
          totalItems={totalCount}
          pageSize={10}
          onPageChange={onPageChange}
          activePage={initialPage}
        />
      </div>
    </div>
  );
}