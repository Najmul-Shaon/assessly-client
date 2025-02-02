const About = () => {
  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-primary">Assessly</span>
        </h1>
        <p className="text-lg text-text_contrast">Assess with Confidence</p>
      </div>

      {/* Content Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Mission */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-text_contrast">
            Our mission is to provide a robust and efficient online examination
            system that enables students and educators to conduct exams easily,
            securely, and with advanced analytics for better assessment.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Vision
          </h2>
          <p className="text-text_contrast">
            Our vision is to revolutionize online examinations by providing a
            seamless, secure, and efficient platform for students and educators.
            We strive to make assessments more accessible, transparent, and
            insightful through innovative technology, ensuring a fair and
            stress-free exam experience for all.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center col-span-2">
          <p className="text-xl font-medium text-gray-800">
            Ready to take challenge?
            <br />
            <span className="text-primary font-semibold">
              Join Match Mate today!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
