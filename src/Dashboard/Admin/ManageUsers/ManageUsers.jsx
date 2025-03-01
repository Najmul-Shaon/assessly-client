import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allUsers = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-users");
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle header={"All Users"} />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((singleUser, i) => (
              <tr key={singleUser?._id}>
                <th>{i + 1}</th>
                <td>{singleUser?.userName}</td>
                <td>{singleUser?.userEmail}</td>
                <td>{singleUser?.userRole}</td>
                <td>{new Date(singleUser?.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className="text-accentColor me-1">Delete</span>||<span className="text-primaryColor ms-1">edit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
