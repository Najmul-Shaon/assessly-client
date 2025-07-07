import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { CiSaveDown1 } from "react-icons/ci";
import { saveAs } from "file-saver";

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const { data: exams = [] } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/result-exam-list");
      return res.data;
    },
  });

  const handleDownload = async (examId, examTitle) => {
    try {
      const response = await axiosSecure.get(
        `/download/exam-report/${examId}`,
        {
          responseType: "blob", // Important for file downloads
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `${examTitle}_Report.xlsx`);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

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
              <tr key={exam?.examId}>
                <th>{i + 1}</th>
                <td>{exam?.examTitle}</td>

                <td className="flex items-center gap-2 text-xl">
                  <button
                    onClick={() =>
                      handleDownload(exam?.examId, exam?.examTitle)
                    }
                    className="text-primaryColor cursor-pointer"
                  >
                    <CiSaveDown1 />
                  </button>
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
