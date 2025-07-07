import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { CiSaveDown1 } from "react-icons/ci";

const MyCertificate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user certificates
  const { data: MyCertificates = [], refetch } = useQuery({
    queryKey: ["MyCertificates", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/certificates/${user?.email}`);
      return res.data;
    },
  });


  useEffect(() => {
    refetch();
  }, [refetch]);

  // Download certificate PDF for a specific row
  const downloadPDF = async ({ name, course, date }) => {
    try {
      const res = await axiosSecure.post(
        "/api/generate-certificate",
        { name, course, date },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate-${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  return (
    <div>
      <SectionTitle header={"My Certificates"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Exam Title</th>
              <th>Completed At</th>
              <th>Marks</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {MyCertificates.map((singleCertificate, i) => (
              // <tr key={singleCertificate?._id}>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{singleCertificate?.examTitle || "Unknown"}</td>
                <td>
                  {new Date(singleCertificate?.create_at).toLocaleDateString()}
                </td>
                <td>{singleCertificate?.obtainMarks}</td>
                <td className="flex items-center gap-1 text-xl">
                  <button
                    onClick={() =>
                      downloadPDF({
                        name: user?.displayName || "Student Name",
                        course:
                          singleCertificate?.examTitle ||
                          "This is the test course name",
                        date: (() => {
                          const createdAt = new Date(
                            singleCertificate?.create_at
                          );
                          const day = createdAt
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const month = createdAt.toLocaleString("en-GB", {
                            month: "long",
                          });
                          const year = createdAt.getFullYear();
                          const getOrdinal = (d) => {
                            if (d > 3 && d < 21) return "th";
                            switch (d % 10) {
                              case 1:
                                return "st";
                              case 2:
                                return "nd";
                              case 3:
                                return "rd";
                              default:
                                return "th";
                            }
                          };
                          return `${day}${getOrdinal(
                            createdAt.getDate()
                          )} ${month} ${year}`;
                        })(),
                      })
                    }
                    className="btn-md btn-link text-accentColor cursor-pointer"
                    title="Download Certificate"
                  >
                    <span className="text-2xl text-black hover:text-accentColor">
                      <CiSaveDown1 />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {MyCertificates.length === 0 && (
          <h3 className="text-center my-4">There are no certificates.</h3>
        )}
      </div>
    </div>
  );
};

export default MyCertificate;
