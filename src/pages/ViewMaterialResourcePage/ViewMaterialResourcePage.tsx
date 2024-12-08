import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import React, { useEffect, useRef, useState } from "react";
import { courseIdToName, coursesOptions, gradeOptions } from "../../constants";
import { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import { Link } from "react-router-dom";
import { fetchDirectionOfCourseByYearAsArray } from "../../DataService/fetchCourse.service";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { IMaterialResource } from "../../models/materialResource.model";
import {
  deleteMaterialResources,
  fetchMaterialResources,
} from "../../DataService/materialResource.service";
import { baseURL } from "../../api/axios";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      return <span>{domToReact(domNode.children)}</span>;
    }
  },
};

export default function ViewMaterialResourcePage() {
  const [materialResources, setMaterialResources] = useState<IMaterialResource[]>([]);
  const [progressMessage, setProgressMessage] = useState("Loading ...");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | string>("9");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [gradesOption] = useState<SelectOption[]>(gradeOptions);
  const [courseOptions] = useState<SelectOption[]>(coursesOptions);
  const isInitialMount = useRef(true);

  const handleSelectYear = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedGrade((e.target as HTMLSelectElement).value);
  };

  const handleSelectCourse = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCourse((e.target as HTMLSelectElement).value);
  };

  const LoadInit = async () => {
    setSelectedCourse(coursesOptions[0].value);
    setSelectedGrade(gradeOptions[0].value);
    await fetchMaterials();
  };

  const deleteMaterialResourceFromServer = async (materialId: string) => {
    let result = await deleteMaterialResources(materialId);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message || ["something is wrong try again Later"];
      for (const msg of messages) {
        msgTxt += msg + " "; 
      }
      setErrorMessage(msgTxt);
      showErrorToast();
    } else {
      setMaterialResources((prev) => prev.filter((dir) => dir._id !== materialId));
      showSuccessToast("Request Success");
    }
  };

  const fetchMaterials = async () => {
    const fetchedMaterials = await fetchMaterialResources({
      courseId: selectedCourse,
      grade: selectedGrade,
    });
    setMaterialResources(fetchedMaterials);

    if (fetchedMaterials.length === 0) {
      setProgressMessage("It looks like you don't have data yet");
    }
  };

  useEffect(() => {
    LoadInit();
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [selectedCourse, selectedGrade]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      (async () => {
        const directionsFromServer = await fetchDirectionOfCourseByYearAsArray(
          selectedCourse,
          parseInt(selectedGrade.toString())
        );
        setMaterialResources(directionsFromServer);
      })();
    }
  }, [selectedGrade]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <span className="mr-4">
          <b>Select Course</b>
          <SelectDropdown
            title=""
            items={courseOptions}
            value={selectedCourse}
            handleSelect={handleSelectCourse}
            styles={{ display: "inline", width: "3rem" }}
          />
        </span>
        <span>
          <b>Select Year</b>
          <SelectDropdown
            title=""
            items={gradesOption}
            value={selectedGrade}
            handleSelect={handleSelectYear}
            styles={{ display: "inline", width: "3rem" }}
          />
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Course</th>
              <th className="border border-gray-300 p-2">Chapter</th>
              <th className="border border-gray-300 p-2">URL</th>
              <th className="border border-gray-300 p-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {materialResources.length > 0 ? (
              materialResources.map((material, index) => (
                <tr key={material._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{material.grade}</td>
                  <td className="border border-gray-300 p-2">{courseIdToName(material.courseId ?? "")}</td>
                  <td className="border border-gray-300 p-2">{material.chapter}</td>
                  <td className="border border-gray-300 p-2">
                    {baseURL + "/material-resources/" + material.url}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Link
                      to={"/admin-user/edit-material-resources"}
                      state={{ materialResource: material }}
                    >
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      onClick={() => deleteMaterialResourceFromServer(material._id || "")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4">{progressMessage}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}