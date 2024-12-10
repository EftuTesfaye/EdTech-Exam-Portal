import { useLocation } from "react-router-dom";
import placeholderImage from "../../assets/place_holder.jpg";
import { PlainQuestion } from "../../models/question.model";
import { ViewPlainQuestionContext } from "../../context/viewPlainQuestionContext";

import { useContext, useEffect, useRef, useState } from "react";

import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import { Link } from "react-router-dom";
import {
  resolveImageURL,
  showErrorToast,
  showSuccessToast,
} from "../../utils/helper";

import { fetchGroupedQuestions } from "../../DataService/viewGroupedQuestion.service";
import {
  deleteGroupedQuestion,
} from "../../DataService/editQuestion.service";
import { AxiosError } from "axios";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      return <span>{domToReact(domNode.children)}</span>;
    }
  },
};

export function ViewGroupedQuestionsPage() {
  const location = useLocation();
  const selectedDirection = location.state?.direction;
  const viewPlainQuestionState = useContext(ViewPlainQuestionContext);

  const [progressMessage, setProgressMessage] = useState("Loading...");
  const [errorMessage, setErrorMessage] = useState("");
  const [questions, setQuestions] = useState<PlainQuestion[]>([]);

  const isInitialMount = useRef(true);
  async function fetchGroupedQuestionFromServer() {
    let questionsFromServer = await fetchGroupedQuestions(selectedDirection);
    if (questionsFromServer.length === 0) {
      setProgressMessage("No questions inserted for this Direction");
    } else {
      setQuestions(questionsFromServer);
    }
  }

  useEffect(() => {
    fetchGroupedQuestionFromServer();
  }, []);

  const deleteGroupedQuestionFromServer = async (questionId: string) => {
    let result = await deleteGroupedQuestion(questionId);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message || ["something is wrong try again Later"];
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      (async () => {
        let questionsFromServer = await fetchGroupedQuestions(selectedDirection);
        setQuestions(questionsFromServer);
      })();
    }
  }, [selectedDirection]);

  return (
    <div className="p-4">
      <div>
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
                <tr key={question._id} className="hover:bg-gray-100">
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
                      className="max-w-[130px] h-[60px]"
                      src={resolveImageURL(question.questionImage || "") || placeholderImage}
                      alt="Question"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <img
                      className="max-w-[130px] h-[60px]"
                      src={resolveImageURL(question.descriptionImage || "") || placeholderImage}
                      alt="Description"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Link
                      to={"/edit-plain-question"}
                      state={{ question }}
                    >
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => {
                          viewPlainQuestionState.setPlainQuestionState({
                            courses: [],
                            page: 1,
                            selectedCourse: selectedDirection,
                            selectedYear: "",
                            years: [],
                          });
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      onClick={() => deleteGroupedQuestionFromServer(question._id || "")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center p-4">{progressMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}