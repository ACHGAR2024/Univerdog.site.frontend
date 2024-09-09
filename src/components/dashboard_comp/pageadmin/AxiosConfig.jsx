import axios from 'axios';
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

const useAxiosInstance = () => {
  const { token } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Modifiez selon votre URL
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return axiosInstance;
};

export default useAxiosInstance;