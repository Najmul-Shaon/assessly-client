import { useEffect } from "react";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import useMyExams from "../../../Hooks/useMyExams";

import MyExamRow from "./MyExamRow";

const MyExams = () => {
  const { myExams, refetch } = useMyExams();
  useEffect(() => {
    refetch();
  }, [refetch, myExams]);

  return (
    <div>
      <SectionTitle header={"My Exams"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Title</th>
              <th>Class</th>
              <th>Topic</th>
              <th>Total Marks</th>
              <th>Type</th>
              <th>Facecam</th>
              <th>Enrolled at</th>
              <th>Availablity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myExams.map((exam, i) => (
              <MyExamRow key={exam._id} exam={exam} index={i} />
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
