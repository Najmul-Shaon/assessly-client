import axios from "axios";

const axiosPublic = axios.create({
  // local api
  // baseURL: "http://localhost:5000",
  // live api
  // baseURL: "https://assessly-server.vercel.app",
  baseURL: "https://assessly-server-production.up.railway.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
