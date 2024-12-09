import { CSSProperties, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import {
  createMaterialResources,
  updateMaterialResources,
} from "../../DataService/materialResource.service";
import { fetchExamCategories } from "../../DataService/fetchExamCatagories.service";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import { Course } from "../../models/exam-catagory.model";
import { Link, useLocation } from "react-router-dom";
import { IMaterialResource } from "../../models/materialResource.model";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export const MaterialResourcePage = () => {
  const location = useLocation();
  const [grade, setGrade] = useState<string | number>("");
  const [chapter, setChapter] = useState<string | number>("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setErrorMessage] = useState("");
  const [materialResource, setMaterialResource] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [editableMaterialResource, setEditableMaterialResource] = useState<any>(null);

  useEffect(() => {
    fetchInitialFromServer();
  }, []);

  async function fetchInitialFromServer() {
    let data = await fetchExamCategories();
    let UEECourses = data.find((e) => e._id === "63a2ecdeee469ea43cdacbac");
    let courses: Course[] = [];
    if (UEECourses) courses = UEECourses.courses;

    let crs: SelectOption[] = courses.map(course => ({ label: course.name, value: course._id }));

    if (!crs.length) return;

    setCourses(crs);
    setCourseId(crs[0].value.toString());

    const editableMaterialResourceState = location.state?.materialResource as IMaterialResource;
    if (editableMaterialResourceState) {
      setIsEditMode(true);
      setEditableMaterialResource(editableMaterialResourceState ?? null);
      setCourseId(editableMaterialResourceState?.courseId ?? "");
      setGrade(editableMaterialResourceState?.grade ?? "9");
      setChapter(editableMaterialResourceState?.chapter ?? "1");
      setSelectedFilePath("");
    }
  }

  function handleMaterialResourceChange(e: any) {
    setSelectedFilePath(URL.createObjectURL(e.target.files[0]));
    setMaterialResource(e.target.files[0]);
  }

  const submitMaterialResource = async () => {
    if (!grade || !chapter || !courseId) {
      showErrorToast("Fill all required fields");
      return;
    }
    if (!isEditMode && !selectedFilePath) {
      showErrorToast("Select a material resource file");
      return;
    }

    setLoading(true);
    let materialResourceSchema: any = {
      grade: parseInt(grade.toString()),
      chapter: parseInt(chapter.toString()),
      materialResource,
      courseId,
    };

    let result;

    if (!isEditMode) {
      result = await createMaterialResources(materialResourceSchema);
    } else {
      if (!materialResource) delete materialResourceSchema.materialResource;
      result = await updateMaterialResources(editableMaterialResource?._id ?? "", materialResourceSchema);
    }

    setLoading(false);
    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message || ["Something went wrong, try again later"];
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      showErrorToast(msgTxt);
    } else {
      showSuccessToast("Request successful");
    }
  };

  const handleCourseChange = (e: any) => {
    setCourseId(e.target.value);
  };

  return (
    <LoadingOverlayWrapper
      active={loading}
      spinner={
        <FadeLoader
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    >
      <div className="p-6 bg-gray-100">
        <div className="mb-4">
          <label className="block text-lg font-semibold">Courses:</label>
          <SelectDropdown
            title=""
            items={courses}
            value={courseId}
            handleSelect={handleCourseChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Grade:</label>
          <input
            value={grade}
            type="number"
            min={9}
            max={12}
            placeholder="9"
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          <ErrorComponent value={grade.toString()} />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Chapter:</label>
          <input
            value={chapter}
            type="number"
            min={1}
            max={20}
            placeholder="1"
            onChange={(e) => setChapter(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          <ErrorComponent value={chapter.toString()} />
        </div>

        <div className="mb-4">
          {selectedFilePath && (
            <div className="h-52 w-52 mb-4">
              <embed src={selectedFilePath} type="application/pdf" width="100%" height="100%" />
            </div>
          )}
          <label className="block text-lg font-semibold">Select Material Resource:</label>
          <div className="flex items-center">
            <label htmlFor="file" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
              Choose File
              <input
                type="file"
                id="file"
                onChange={handleMaterialResourceChange}
                className="hidden"
              />
            </label>
            <span className="ml-2">{selectedFilePath ? "" : "No file chosen"}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={submitMaterialResource}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <Link to={"/admin-user/view-material-resources"}>
            <button className="bg-gray-500 text-white py-2 px-4 rounded ml-4">
              Back To View Material Resources
            </button>
          </Link>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
};