import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";

const usePaid = (id, type) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isPaid = false } = useQuery({
    queryKey: [user?.email, "isPaid"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/check/payment?id=${id}&type=${type}&email=${user?.email}`
      );
      return res.data?.paid;
    },
  });

  return { isPaid };
};

export default usePaid;
