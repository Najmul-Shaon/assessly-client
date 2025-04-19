import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Assessley | Manage Users</title>
      </Helmet>
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
                <td className="flex items-center gap-2 text-xl">
                  <span className="text-accentColor">
                    <IoTrashBinOutline />
                  </span>
         
                  <Link>
                    <span className="text-primaryColor">
                      <FaRegEdit />{" "}
                    </span>
                  </Link>{" "}
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
