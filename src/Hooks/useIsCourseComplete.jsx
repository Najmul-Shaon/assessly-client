import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";

const useIsCourseComplete = (id) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isComplete = false, refetch } = useQuery({
    queryKey: [user?.email, id, "isComplete"],
    enabled: !!user?.email,
    // enabled: !!user?.email && !!localStorage.getItem("token"),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/check/course?courseId=${id}&email=${user?.email}`
      );
      return res.data?.isComplete;
    },
  });

  return { isComplete, refetch };
};

export default useIsCourseComplete;
