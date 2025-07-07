import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CiSaveDown1 } from "react-icons/ci";

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const { data: exams = [] } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/result-exam-list");
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>Assessley | Reports</title>
      </Helmet>
      <SectionTitle header={"Reports"} />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Exam Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, i) => (
              <tr key={exam?._id}>
                <th>{i + 1}</th>
                <td>{exam?.examTitle}</td>

                <td className="flex items-center gap-2 text-xl">
                  <Link>
                    <span className="text-primaryColor">
                      <CiSaveDown1 />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
