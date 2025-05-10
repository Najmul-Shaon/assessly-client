import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";

const useRegularUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isRegularUser, isPending: isRegularLoading } = useQuery({
    queryKey: [user?.email, "isRegularUser"],
    // enabled: !!user?.email,
    enabled: !!user?.email && !!localStorage.getItem("token"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/regular/${user?.email}`);
      return res.data?.isUser;
    },
  });
  return { isRegularUser, isRegularLoading };
};

export default useRegularUser;
