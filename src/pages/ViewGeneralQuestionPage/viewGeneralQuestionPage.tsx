import placeholderImage from "../../assets/place_holder.jpg";
import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import { Link, useLocation } from "react-router-dom";
import {
  resolveImageURL,
  showErrorToast,
  showSuccessToast,
} from "../../utils/helper";
import { deleteGeneralQuestion } from "../../DataService/editQuestion.service";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { GeneralQuestion } from "../../models/general.model";
import CustomPagination from "../../components/pagination";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";
import { fetchGeneralQuestions } from "../../DataService/viewGeneralQuestion.service";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      return <span>{domToReact(domNode.children)}</span>;
    }
  },
};

export default function ViewExerciseQuestionPage() {
  const location = useLocation();
  const [initialPage, setInitialPage] = useState(location.state?.initialPage || 1);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<GeneralQuestion[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [examCatagories, setExamCatagories] = useState<SelectOption[]>([]);
  const [selectedExamCategory, setSelectedExamCategory] = useState("");

  useEffect(() => {
    if (!selectedExamCategory) return;
    getQuestion(initialPage);
  }, [selectedExamCategory]);

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    setLoading(true);
    const data = await fetchExamCategories();
    const examCatsOption = data
      .filter(cat => cat?.category === "generalQuestion")
      .map(cat => ({ label: cat.name, value: cat._id }));

    if (examCatsOption.length === 0) return;
    
    setExamCatagories(examCatsOption);
    setSelectedExamCategory(examCatsOption[0].value);
    getQuestion(initialPage);
    setLoading(false);
  };

  const handleExamCategoryChange = (e: any) => {
    setInitialPage(1);
    setSelectedExamCategory(e.target.value);
  };

  const getQuestion = async (page: number) => {
    setLoading(true);
    const { count, questions } = await fetchGeneralQuestions(page, selectedExamCategory);
    setLoading(false);
    setQuestions(questions);
    setTotalCount(count);
  };

  const onPageChange = async (page: number) => {
    setLoading(true);
    const { count, questions } = await fetchGeneralQuestions(page, selectedExamCategory);
    setLoading(false);
    setInitialPage(page);
    setQuestions(questions);
    setTotalCount(count);
  };

  const deleteGeneralQuestionFromServer = async (questionId: string) => {
    const result: any = await deleteGeneralQuestion(questionId);
    if (result instanceof AxiosError) {
      const messages = result.response?.data?.message || ["Something went wrong, try again later"];
      setErrorMessage(messages.join(" "));
      showErrorToast();
    } else {
      setQuestions(prev => prev.filter(q => q._id !== questionId));
      showSuccessToast("Request Success");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="font-bold text-green-600">Select Category</p>
        <SelectDropdown
          title=""
          items={examCatagories}
          value={selectedExamCategory.toString()}
          handleSelect={handleExamCategoryChange}
        />
      </div>
      <div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">No</th>
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
            {!loading && questions.length > 0 ? (
              questions.map((question, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{question.questionNumber}</td>
                  <td className="border border-gray-300 p-2">{parse(question.questionText, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_a, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_b, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_c, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(question.option_d, options)}</td>
                  <td className="border border-gray-300 p-2">{question.answer}</td>
                  <td className="border border-gray-300 p-2">{parse(question?.description || " ", options)}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={resolveImageURL(question.questionImage || "") || placeholderImage}
                      className="max-w-xs max-h-24"
                      alt="Question"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={resolveImageURL(question.descriptionImage || "") || placeholderImage}
                      className="max-w-xs max-h-24"
                      alt="Description"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex space-x-2">
                      <Link to={"/admin-user/edit-general-questions"} state={{ question, initialPage }}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteGeneralQuestionFromServer(question._id || "")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : loading ? (
              <tr>
                <td colSpan={11} className="text-center">Loading....</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={11} className="text-center">No question inserted for this category</td>
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
          activePage={initialPage}
        />
      </div>
    </div>
  );
}