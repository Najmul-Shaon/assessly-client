import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import { CiSaveDown1 } from "react-icons/ci";

const MyCertificate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  return (
    <div>
      <SectionTitle header={"My Certificates"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Course Type</th>
              <th>Complete At</th>
              <th>Marks</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {MyCertificates.map((singleCertificate, i) => (
              <tr key={singleCertificate?._id}>
                <th>{i + 1}</th>
                <td>{singleCertificate?.examId}</td>
                <td>{singleCertificate?.trxId}</td>
                <td>{singleCertificate?.examTitle}</td>
                <td>{singleCertificate?.examType}</td>
                <td>{new Date(singleCertificate?.paymentAt).toLocaleDateString()}</td>
                <td className="flex items-center gap-1 text-xl">
                  <Link>
                    <button className="btn-md btn-link text-accentColor cursor-pointer">
                      <span className="text-2xl text-black hover:text-accentColor">
                        <CiSaveDown1 />
                      </span>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {MyCertificates.length <= 0 && (
          <>
            <h3 className="text-center my-4">There are no Certificates.</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCertificate;
