import axios from "axios";

export const baseURL = "https://coydoe.onrender.com"; // "http://localhost:3000";

console.log("axios token loaded");

const getClerkToken = () => {
  let clerkOrAdmin: string | null = null;
  clerkOrAdmin = localStorage.getItem("coydoeClerkUser");
  if (!clerkOrAdmin) {
    clerkOrAdmin = localStorage.getItem("coydoeAdminUser");
  }
  const parsedClerk = JSON.parse(clerkOrAdmin || "{}") as {
    token: string;
    username: string;
  };
  return parsedClerk?.token ? parsedClerk?.token : "";
};

export default axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    Authorization: `Bearer ${getClerkToken()}`,
  },
});

// http://localhost:3000/api/
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmYwYmY2YzVlNTEwYjBjMWFmY2VjZCIsInBob25lIjoiKzI1MTIyMjIyMjIyMiIsImlhdCI6MTY3NTY3NDU5Mn0.4IF3BYlOTcZT9o0X8skhTYc1I2ID3uxoZnjA7NL-kUI
