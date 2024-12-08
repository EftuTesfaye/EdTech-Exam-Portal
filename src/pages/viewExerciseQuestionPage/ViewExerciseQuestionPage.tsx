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
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import styles from "./viewExercise.module.css";
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
  let [initialPage, setInitialPage] = useState(
    location.state?.initialPage || 1
  );
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

    if (Array.isArray(questions) && questions.length == 0) {
      setMessage("No Questions inserted Yet For this Grade and ");
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
      const messages =
        result.response?.data?.message ||
        (["something is wrong try again Later"] as Array<string>);
      for (const msg of messages) {
        msgTxt += msg + " "; //concatenate array of error messages
      }
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setQuestions((prev) => {
        let newQues = prev.filter((q) => q._id !== questionId);
        return [...newQues];
      });

      showSuccessToast("Request Success");
    }
  };
  return (
    <div>
      <div className={styles.dropDown}>
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
      <div className={styles.allTable}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.row}>
              <th
                className={`${styles.tableHeader} ${styles.th} ${styles.noColumn}`}
              >
                No
              </th>
              <th className={`${styles.th}`}>Chapter </th>
              <th className={`${styles.th} ${styles.questionColumn}`}>
                Questions
              </th>
              <th className={`${styles.th}`}>Option 'A'</th>
              <th className={`${styles.th}`}>Option 'B'</th>
              <th className={`${styles.th}`}>Option 'C'</th>
              <th className={`${styles.th}`}>Option 'D'</th>
              <th className={`${styles.th} ${styles.answerColumn}`}>Ans</th>
              <th className={`${styles.th} ${styles.descriptionColumn}`}>
                Description
              </th>
              <th className={`${styles.th}`}>Que Img </th>
              <th className={` ${styles.th}`}>Des Img </th>
              <th className={`${styles.th}`}>Manage</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0
              ? questions.map((question, index) => (
                  <tr className={styles.tr} key={index}>
                    <td className={`${styles.td} ${styles.tdNo}`}>
                      {question?.questionNumber}
                    </td>

                    <td className={`${styles.td} ${styles.tdNo}`}>
                      {question?.chapter}
                    </td>

                    <td className={styles.td}>
                      {parse(question.questionText, options)}
                    </td>

                    <td className={styles.td}>
                      {parse(question.option_a, options)}
                    </td>
                    <td className={styles.td}>
                      {parse(question.option_b, options)}
                    </td>
                    <td className={styles.td}>
                      {parse(question.option_c, options)}
                    </td>
                    <td className={styles.td}>
                      {parse(question.option_d, options)}
                    </td>
                    <td className={styles.td}>{question.answer}</td>
                    <td className={styles.td}>
                      {parse(question?.description || "", options)}
                    </td>
                    <td className={styles.td}>
                      <img
                        style={{ maxWidth: "130px", height: "60px" }}
                        src={
                          resolveImageURL(question.questionImage || "") ||
                          placeholderImage
                        }
                      />
                    </td>
                    <td className={styles.td}>
                      {" "}
                      <img
                        style={{ maxWidth: "130px", height: "60px" }}
                        src={
                          resolveImageURL(question.descriptionImage || "") ||
                          placeholderImage
                        }
                      />
                    </td>
                    <td className={styles.td}>
                      <Link
                        to={"/admin-user/edit-exercise-question"}
                        state={{ question }}
                      >
                        <button className={styles.label}>Edit</button>
                      </Link>
                      <button
                        className={styles.label1}
                        onClick={() =>
                          deleteExerciseQuestionFromServer(question._id || "")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : message}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <div className="">
          <CustomPagination
            totalItems={totalCount}
            pageSize={10}
            onPageChange={onPageChange}
            activePage={initialPage}
          />
        </div>
      </div>
    </div>
  );
}
