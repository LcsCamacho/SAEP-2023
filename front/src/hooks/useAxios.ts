import axios from "axios";

export const useAxios = () => {
  const api = axios.create({
    baseURL: "http://localhost:3777",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { api };
};
