import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";

const MyExams = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myExams = [], refetch } = useQuery({
    queryKey: ["myExams", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/exams/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);
  console.log(myExams);
  //
  return (
    <div>
      <SectionTitle header={"My Exams"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Exam Id</th>
              <th>Trx Id</th>
              <th>Title</th>
              <th>Class</th>
              <th>Topic</th>
              <th>Type</th>
              <th>Fee</th>
              <th>Pay Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myExams.map((singleExam, i) => (
              <tr key={singleExam?._id}>
                <th>{i + 1}</th>
                <td>{singleExam?.examId}</td>
                <td>{singleExam?.trxId}</td>
                <td>{singleExam?.examTitle}</td>
                <td>{singleExam?.class || "N/A"}</td>
                <td>{singleExam?.examTopic}</td>
                <td>{singleExam?.examType}</td>
                <td>{singleExam?.examFee}</td>
                <td>{new Date(singleExam?.paymentAt).toLocaleDateString()}</td>
                <td className="flex items-center gap-1 text-xl">
                  <Link>
                    <button className="btn-md btn-link text-accentColor cursor-pointer">
                      Start
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myExams.length <= 0 && (
          <>
            <h3 className="text-center my-4">
              There are no exam. Please enroll first.
              <Link to={"/exams"} className="text-accentColor underline ms-2">
                <span>Exams</span>
              </Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default MyExams;
