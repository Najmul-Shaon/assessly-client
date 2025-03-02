import axios from "axios";

const axiosSecure = axios.create({
  // local api
  // baseURL: "http://localhost:5000",
  // live api
  baseURL: "https://assessly-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
