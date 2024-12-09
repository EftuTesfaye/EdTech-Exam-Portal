import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clerkLogin, clerkSignup } from "../../DataService/auth.service";
import { AxiosError } from "axios";
import { FadeLoader } from "react-spinners";

export default function ClerkAuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleSwitchMode = () => setIsLoginMode(!isLoginMode);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let result = await clerkLogin(username, password, token);
    if (result instanceof AxiosError) {
      setLoading(false);
      const messages =
        result.response?.data?.message ||
        ["Something went wrong, please try again later"];
      setMessage(messages.join(" "));
    } else {
      setLoading(false);
      localStorage.setItem(
        "coydoeClerkUser",
        JSON.stringify({ token: result?.token, username: result?.username })
      );
      window.location.href = "/data";
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords must match");
      return;
    }
    setLoading(true);
    let result = await clerkSignup(username, password, token);
    if (result instanceof AxiosError) {
      setLoading(false);
      const messages =
        result.response?.data?.message ||
        ["Something went wrong, please try again later"];
      setMessage(messages.join(" "));
    } else {
      setLoading(false);
      localStorage.setItem(
        "coydoeClerkUser",
        JSON.stringify({ token: result?.token, username: result?.username })
      );
      window.location.href = "/admin-user";
    }
  };

  useEffect(() => {
    const tokenFromState = location.state?.token as string;
    if (!tokenFromState) {
      navigate("/");
    } else {
      setToken(tokenFromState);
    }
  }, [location.state, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        {loading && (
          <div className="flex justify-center mb-4">
            <FadeLoader color="#4A90E2" />
          </div>
        )}

        <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
          {isLoginMode ? "Login" : "Signup"}
        </h2>

        {message && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {message}
          </div>
        )}

        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>

            <div className="mb-4">
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
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Not a Coydoe member?{" "}
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={handleSwitchMode}
              >
                Sign Up
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 p-3 text-white transition hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={handleSwitchMode}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
