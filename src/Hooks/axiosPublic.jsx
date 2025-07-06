import axios from "axios";

const axiosPublic = axios.create({
  // local api
  baseURL: "http://localhost:5000",
  // live api
  // baseURL: "https://assessly-server.vercel.app",
  // baseURL: "https://assessly-server-production.up.railway.app",
  // current live backend
  // baseURL: "https://assessly-server.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
