import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const Certificate = ({ userName, examName }) => {
  const certRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(certRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${userName}_certificate.pdf`);
  };

  return (
    <div>
      <div
        ref={certRef}
        style={{ width: "1086px", height: "768px", position: "relative" }}
      >
        <img
          src="/download.jpg" // Ensure this is a public path or base64
          alt="Certificate"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Name Overlay */}
        <div
          style={{
            position: "absolute",
            top: "47%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "serif",
            color: "#2c2c5a",
          }}
        >
          {userName}
        </div>
        {/* Exam Name Overlay */}
        <div
          style={{
            position: "absolute",
            top: "62%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "20px",
            fontFamily: "sans-serif",
            color: "#555",
          }}
        >
          For completing: {examName}
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
