import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import React, { useEffect, useRef, useState } from "react";
import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import { Link } from "react-router-dom";
import { Direction } from "../../models/direction.model";
import {
  fetchDirectionOfCourseByYearAsArray,
  fetchGroupedCourses,
  fetchGroupedCoursesDirectionYears,
} from "../../DataService/fetchCourse.service";
import { deleteDirections } from "../../DataService/editDirections.service";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      return <span>{domToReact(domNode.children)}</span>;
    }
  },
};

export default function ViewDirectionsPage() {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [progressMessage, setProgressMessage] = useState("Loading ...");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | string>("2015");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [yearOptions, setYearOptions] = useState<SelectOption[]>([]);
  const [courseOptions, setCourseOptions] = useState<SelectOption[]>([]);
  const isInitialMount = useRef(true);

  const handleSelectYear = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedYear((e.target as HTMLSelectElement).value);
  };
  
  const handleSelectCourse = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCourse((e.target as HTMLSelectElement).value);
  };

  const LoadInit = async () => {
    const groupedCourses = await fetchGroupedCourses();
    setCourseOptions(groupedCourses);
    const defaultCourseId = groupedCourses[0].value;
    setSelectedCourse(defaultCourseId);
    const years = await fetchGroupedCoursesDirectionYears(defaultCourseId);
    setYearOptions(years);
    
    if (years.length === 0) {
      setProgressMessage("It looks like you don't have data yet");
      return;
    }
    
    const defaultYear = years[0].value;
    setSelectedYear(defaultYear);
    const directionsFromServer = await fetchDirectionOfCourseByYearAsArray(defaultCourseId, parseInt(defaultYear.toString()));
    setDirections(directionsFromServer);
  };

  const deleteDirectionFromServer = async (directionId: string) => {
    let result = await deleteDirections(directionId);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message || ["Something went wrong, try again later"];
      for (const msg of messages) {
        msgTxt += msg + " "; // Concatenate array of error messages
      }
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setDirections((prev) => prev.filter((dir) => dir._id !== directionId));
      showSuccessToast("Request Success");
    }
  };

  const fetchYears = async () => {
    const years = await fetchGroupedCoursesDirectionYears(selectedCourse);
    setYearOptions(years);
    
    if (years.length === 0) {
      setProgressMessage("It looks like you don't have data yet");
      return;
    }
    
    const defaultYear = years[0].value;
    setSelectedYear(defaultYear);
  };

  useEffect(() => {
    LoadInit();
  }, []);

  useEffect(() => {
    fetchYears();
  }, [selectedCourse]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      (async () => {
        const directionsFromServer = await fetchDirectionOfCourseByYearAsArray(selectedCourse, parseInt(selectedYear.toString()));
        setDirections(directionsFromServer);
      })();
    }
  }, [selectedYear]);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <div className="mb-2 md:mb-0">
          <label className="font-bold">Select Course</label>
          <SelectDropdown
            title=""
            items={courseOptions}
            value={selectedCourse}
            handleSelect={handleSelectCourse}
            styles={{ display: "inline", width: "3rem" }}
          />
        </div>
        <div>
          <label className="font-bold">Select Year</label>
          <SelectDropdown
            title=""
            items={yearOptions}
            value={selectedYear}
            handleSelect={handleSelectYear}
            styles={{ display: "inline", width: "3rem" }}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Direction Text</th>
              <th className="border border-gray-300 p-2">Section Name</th>
              <th className="border border-gray-300 p-2">Passage</th>
              <th className="border border-gray-300 p-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {directions.length > 0 ? (
              directions.map((direction, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{direction.directionNumber}</td>
                  <td className="border border-gray-300 p-2">{direction.courseYear}</td>
                  <td className="border border-gray-300 p-2">{parse(direction.directionText, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(direction.sectionName, options)}</td>
                  <td className="border border-gray-300 p-2">{parse(direction.passage || "", options)}</td>
                  <td className="border border-gray-300 p-2">
                    <Link to={"/admin-user/edit-direction"} state={{ direction }}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      onClick={() => deleteDirectionFromServer(direction._id || "")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">{progressMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}