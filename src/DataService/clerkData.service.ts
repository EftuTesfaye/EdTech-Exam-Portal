import axios from "../api/axios";
import { Clerk } from "../models/clerks.model";

type ClerksAndDataSystemInfo = { clerks: Clerk[] } & { totalData: number };
export type ClerkCourseInsertionReport = {
  name: string;
  insertions: {
    createdAt: string;
    count: number;
  }[];
};
export type AllTimeData = {
  name: string;
  count: number;
};
export const getClerkInfoFromServer = async () => {
  const result = await axios.get("/data-clerk");
  const data = result.data as {
    username: string;
    balance: number;
    questionsEntered: number;
  };
  return data;
};

export const getClerksAndDataInfoFromServer = async () => {
  const result = await axios.get("/data-clerk/system-info");
  const data = result.data as ClerksAndDataSystemInfo;
  return data;
};

export const fetchDurationDataReport = async (
  clerkId: string,
  duration: number
) => {
  const result = await axios.post("/data-clerk/get/data-insertion-report", {
    clerkId,
    durationInDays: duration,
  });
  const data = result.data as ClerkCourseInsertionReport[];
  return data;
};
export const fetchAllTimeDataInsertionReport = async (clerkId: string) => {
  const result = await axios.get(
    `/data-clerk/get-all-time-insertion-report/${clerkId}`
  );
  const data = result.data as AllTimeData[];
  return data;
};
