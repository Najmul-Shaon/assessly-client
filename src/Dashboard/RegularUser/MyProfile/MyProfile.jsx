import useAuth from "../../../Hooks/useAuth";
import useRegularUser from "../../../Hooks/useRegularUser";

const MyProfile = () => {
  const { user } = useAuth();
  //   const { isAdmin } = useAdmin();
  const { isRegularUser } = useRegularUser();
  console.log(isRegularUser);

  return (
    <div className="max-w-xs mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center text-center">
        <img
          src={user?.photoURL}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-accent mb-4"
        />
        <h2 className="text-xl font-semibold text-accent mb-2">
          {user?.displayName}
        </h2>
        <p className="text-lg text-gray-700">{user?.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          {isRegularUser && "Student"}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
