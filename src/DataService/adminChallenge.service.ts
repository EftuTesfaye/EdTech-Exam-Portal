// POST:   /admin-challenge/create

import axios from "../api/axios";

export const createAdminChallenge = async (adminChallengeDto: any) => {
  const result = await axios.post("/admin-challenge/create", adminChallengeDto);
  const data = result.data;
  return data;
};
