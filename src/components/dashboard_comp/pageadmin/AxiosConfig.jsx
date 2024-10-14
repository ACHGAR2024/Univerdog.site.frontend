import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

const useAxiosInstance = () => {
  const { token } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: "https://api.univerdog.site/api/", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default useAxiosInstance;
