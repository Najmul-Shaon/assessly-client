import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";

const useMyExams = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myExams = [], refetch } = useQuery({
    // enabled: !!user?.email && !!localStorage.getItem("token"),
    enabled: !!user?.email,
    queryKey: ["myExams", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/exams/${user?.email}`);
      return res.data;
    },
  });
  return { myExams, refetch };
};

export default useMyExams;
