import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRegularUser from "../../../Hooks/useRegularUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";

const MyProfile = () => {
  const { user } = useAuth();
  const { isRegularUser } = useRegularUser();
  const [isEditing, setIsEditing] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, refetch } = useQuery({
    // enabled: !!user?.email,
    enabled: !!user?.email && !!localStorage.getItem("token"),
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user?email=${user?.email}`);
      return res.data;
    },
  });


  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    userImg: "",
    phone: "",
    email: "",
    role: "",
    country: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.userName || "",
        gender: userInfo?.gender || "",
        dateOfBirth: userInfo?.dateOfBirth || "",
        userImg: userInfo?.userImg || "",
        email: userInfo?.userEmail || "",
        phone: userInfo?.phone || "",
        role: userInfo?.userRole || "",
        country: userInfo?.country || "",
        city: userInfo?.city || "",
        postalCode: userInfo?.postalCode || "",
      });
    }
  }, [userInfo, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (email) => {
    setIsEditing(false);
    // TODO: Call API or update logic here with `formData`
    // console.log("Updated Data", formData);

    const updatedData = { ...formData };
    delete updatedData.email;
    delete updatedData.role;
    delete updatedData.userImg;
    delete updatedData.name;

    const res = await axiosSecure.patch(
      `/api/update-user?email=${email}`,
      updatedData
    );

    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Updated profile info.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="tracking-wider text-2xl">My Profile</h2>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="cursor-pointer"
        >
          <span className="text-2xl text-accentColor">
            {" "}
            {isEditing ? <MdCancelPresentation /> : <FaRegEdit />}
          </span>
        </button>
      </div>

      <div className="space-y-8 mt-4">
        {/* Photo Section */}
        <div className="bg-base-100 py-8 px-10 rounded-xl flex items-center gap-x-6">
          <div className="avatar">
            <div className="w-16 lg:w-24 rounded-full">
              <img src={userInfo?.userImg} />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold">{userInfo?.userName}</h2>
            <h5 className="text-sm">{isRegularUser && "Student"}</h5>
            <h6 className="text-sm">{userInfo?.userEmail}</h6>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-base-100 py-8 px-10 rounded-xl">
          <div className="border-b-2 border-base-300">
            <h2 className="pb-2 font-Gilda text-lg">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {["name", "gender", "dateOfBirth", "phone", "email", "role"].map(
              (field) => (
                <div key={field}>
                  <h5 className="text-gray-500 capitalize">
                    {field === "dateOfBirth"
                      ? "Date of Birth"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </h5>
                  {isEditing &&
                  field !== "email" &&
                  field !== "role" &&
                  field !== "name" ? (
                    field === "gender" ? (
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : field === "dateOfBirth" ? (
                      <input
                        type="date"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                      />
                    ) : (
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="input input-bordered w-full mt-1"
                      />
                    )
                  ) : field === "email" ? (
                    <input
                      type="email"
                      name="email"
                      value={formData?.email}
                      readOnly
                      disabled
                      className="border-none w-full cursor-not-allowed"
                    />
                  ) : field === "role" ? (
                    <input
                      type="text"
                      name="role"
                      value={formData?.role}
                      readOnly
                      disabled
                      className="border-none w-full cursor-not-allowed"
                    />
                  ) : field === "name" ? (
                    <input
                      type="text"
                      name="name"
                      value={formData?.name}
                      readOnly
                      disabled
                      className="border-none w-full cursor-not-allowed"
                    />
                  ) : (
                    <h5>{formData[field]}</h5>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Address Info */}
        <div className="bg-base-100 py-8 px-10 rounded-xl">
          <div className="border-b-2 border-base-300">
            <h2 className="pb-2 font-Gilda text-lg">Address</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {["country", "city", "postalCode"].map((field) => (
              <div key={field}>
                <h5 className="text-gray-500 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </h5>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1"
                  />
                ) : (
                  <h5>{formData[field]}</h5>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={() => handleSave(user?.email)}
              className="btn primary-btn my-4"
            >
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
