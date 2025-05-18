import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";

const useIsExamSubmitted = (id) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isSubmitted = false } = useQuery({
    queryKey: [user?.email, id, "isSubmitted"],
    // enabled: !!user?.email,
    enabled: !!user?.email && !!localStorage.getItem("token"),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/check/is-submit?id=${id}&email=${user?.email}`
      );
      return res.data?.isSubmit;
    },
  });

  return { isSubmitted };
};

export default useIsExamSubmitted;
