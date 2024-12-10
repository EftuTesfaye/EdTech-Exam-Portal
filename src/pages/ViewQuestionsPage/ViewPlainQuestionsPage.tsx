import{useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchPlainQuestions } from "../../DataService/viewPlainQuestion.service";
import { deletePlainQuestion } from "../../DataService/editQuestion.service";
import placeholderImage from "../../assets/place_holder.jpg";
import { PlainQuestion } from "../../models/question.model";
import { ViewPlainQuestionContext } from "../../context/viewPlainQuestionContext";
import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import { resolveImageURL, showErrorToast, showSuccessToast } from "../../utils/helper";
import CustomPagination from "../../components/pagination";
import { AxiosError } from "axios";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      return <span>{domToReact(domNode.children)}</span>;
    }
  },
};

export default function ViewPlainQuestionsPage() {
  const location = useLocation();
  const selectedYear: number | string = location.state?.year;
  const selectedCourse: string = location.state?.course;
  const page = location.state?.page;
  const viewPlainQuestionState = useContext(ViewPlainQuestionContext);
  const [questions, setQuestions] = useState<PlainQuestion[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(page || 0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    getQuestions({ course: selectedCourse, year: selectedYear, page: activePage });
  }, []);

  const deletePlainQuestionFromServer = async (questionId: string) => {
    let result = await deletePlainQuestion(questionId);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message || ["something is wrong try again Later"];
      for (const msg of messages) {
        msgTxt += msg + " ";
      }
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setQuestions((prev) => prev.filter((q) => q._id !== questionId));
      showSuccessToast("Request Success");
    }
  };

  const getQuestions = async ({ course, year, page }: { course: string; year: string | number; page: number; }) => {
    const { count, questions } = await fetchPlainQuestions({ course, year, page });
    setQuestions(questions);
    setTotalCount(count);
  };

  const onPageChange = async (page: number) => {
    const { count, questions } = await fetchPlainQuestions({ course: selectedCourse, year: selectedYear, page });
    setActivePage(page);
    setQuestions(questions);
    setTotalCount(count);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Questions</th>
              <th className="border border-gray-300 p-2">Option 'A'</th>
              <th className="border border-gray-300 p-2">Option 'B'</th>
              <th className="border border-gray-300 p-2">Option 'C'</th>
              <th className="border border-gray-300 p-2">Option 'D'</th>
              <th className="border border-gray-300 p-2">Ans</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Que Img</th>
              <th className="border border-gray-300 p-2">Des Img</th>
              <th className="border border-gray-300 p-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <tr className="hover:bg-gray-100" key={index}>
                  <td className="border border-gray-300 p-2">{question.questionNumber}</td>
                  <td className="border border-gray-300 p-2">{question.year}</td>
                  <td className="border border-gray-300 p-2">{parse(question.questionText, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_a, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_b, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_c, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_d, options)}</td>
                  <td className="border border-gray-300 p-2">{question.answer}</td>
                  <td className="border border-gray-300 p-2">{parse(question.description, options)}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      className="max-w-[130px] max-h-[60px]"
                      src={resolveImageURL(question.questionImage || "") || placeholderImage}
                      alt="Question"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <img
                      className="max-w-[130px] max-h-[60px]"
                      src={resolveImageURL(question.descriptionImage || "") || placeholderImage}
                      alt="Description"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex space-x-2">
                      <Link
                        to={"/edit-plain-question"}
                        state={{ question }}
                      >
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => {
                            viewPlainQuestionState.setPlainQuestionState({
                              courses: [],
                              page: activePage > 0 ? activePage : 1,
                              selectedCourse,
                              selectedYear,
                              years: [],
                            });
                          }}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deletePlainQuestionFromServer(question._id || "")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center p-4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <CustomPagination
          totalItems={totalCount}
          pageSize={10}
          onPageChange={onPageChange}
          activePage={activePage}
        />
      </div>
    </div>
  );
}