import { CSSProperties, useState } from "react";
import { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/helper";
import { createAdminChallenge } from "../../DataService/adminChallenge.service";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

const AdminChallenge = () => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("");
  const [level, setLevel] = useState<number>(7);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [message, setErrorMessage] = useState("");

  const submitChallenge = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    const adminChallenge = {
      label,
      level,
      startDate,
      endDate,
      isActive,
    };

    if (!label || !level || !startDate || !endDate) {
      setLoading(false);
      setErrorMessage("All fields must be filled out!");
      return;
    }

    const result = await createAdminChallenge(adminChallenge);
    setLoading(false);

    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages =
        result.response?.data?.message ||
        ["Something went wrong. Please try again later."];
      for (const msg of messages) msgTxt += msg + " ";
      setErrorMessage(msgTxt);
      showErrorToast(msgTxt);
    } else {
      showSuccessToast("Challenge successfully created!");
      setLabel("");
      setLevel(7);
      setStartDate("");
      setEndDate("");
      setIsActive(false);
    }
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
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-200 p-4">
        <h2 className="text-3xl font-bold mb-6">Create Admin Challenge</h2>

        <form
          onSubmit={submitChallenge}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="label">
              Challenge Label:
            </label>
            <input
              type="text"
              id="label"
              className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
            {label === "" && (
              <p className="text-red-500 text-sm">Field must be filled</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="level">
              Category (Level):
            </label>
            <input
              type="number"
              id="level"
              className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              required
            />
            {!level && (
              <p className="text-red-500 text-sm">Field must be filled</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="start-date">
              Challenge Start Date:
            </label>
            <input
              type="date"
              id="start-date"
              className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="end-date">
              Challenge End Date:
            </label>
            <input
              type="date"
              id="end-date"
              className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="is-active"
              className="mr-2"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <label className="text-gray-700" htmlFor="is-active">
              Make Challenge Active
            </label>
          </div>

          {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
            <Link to="/view-exam-category">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Back To view Exam Category
              </button>
            </Link>
          </div>
        </form>
      </div>
    </LoadingOverlayWrapper>
  );
};

export default AdminChallenge;
