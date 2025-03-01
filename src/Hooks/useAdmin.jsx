import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      return res.data?.isAdmin;
    },
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
