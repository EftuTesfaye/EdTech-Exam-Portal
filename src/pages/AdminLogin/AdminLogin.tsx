import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../DataService/auth.service";
import { FadeLoader } from "react-spinners";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let result = await adminLogin(username, password);
    if (result instanceof AxiosError) {
      setLoading(false);
      const messages =
        result.response?.data?.message ||
        ["Something went wrong, please try again later"];
      const msgTxt = messages.join(" ");
      setMessage(msgTxt);
    } else {
      setLoading(false);
      localStorage.setItem(
        "coydoeAdminUser",
        JSON.stringify({ token: result.token, username: result.username })
      );
      window.location.href = "/admin";
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        {loading && (
          <div className="flex justify-center mb-4">
            <FadeLoader color="#4A90E2" />
          </div>
        )}
        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
          Admin Login
        </h2>

        {message && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {message}
          </div>
        )}

        <form onSubmit={loginAdmin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 p-3 text-white transition hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
