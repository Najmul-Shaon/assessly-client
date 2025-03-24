import SectionTitle from "../../components/sectionTiltle/SectionTitle";

const Features = () => {
  const features = [
    {
      title: "User Roles & Authentication",
      description:
        "Secure login with Firebase, role-based access (Student, Mentor, Admin).",
      icon: "🔐",
    },
    {
      title: "Exam Management",
      description:
        "Single & Group exams, time-based assessments, various question types.",
      icon: "📖",
    },
    {
      title: "Payment Integration",
      description:
        "SSLCommerz for secure exam enrollments and payment tracking.",
      icon: "💳",
    },
    {
      title: "Course System",
      description:
        "Admin can create and manage video-based courses for students.",
      icon: "🎓",
    },
    {
      title: "Results & Certification",
      description:
        "Auto-generated results, digital certificates for successful candidates.",
      icon: "📜",
    },
    {
      title: "Blog Section",
      description:
        "Free educational blogs on exam preparation and study techniques.",
      icon: "📝",
    },
    {
      title: "User Dashboard",
      description:
        "Track enrolled exams, upcoming exams, and past performance.",
      icon: "📊",
    },
    {
      title: "Admin Dashboard",
      description: "Manage users, exams, transactions, courses, and blogs.",
      icon: "⚙️",
    },
  ];
  return (
    // <div className="py-10 px-5 md:px-20">
    <div className="mt-20">
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"Features"}></SectionTitle>{" "}
      </div>
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Feature List */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondaryColor p-6 rounded-xl shadow-md flex items-start gap-4 hover:scale-101 transform transition"
            >
              <div className="text-red-600 text-2xl">{feature.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
