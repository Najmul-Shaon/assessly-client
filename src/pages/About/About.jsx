import { Helmet } from "react-helmet-async";
import aboutUsImg from "../../assets/close-up-portrait-man-packing-suitcase-making-notes-checklist-items-he-wants-take-holiday-packing-luggage.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>Assessly | About</title>
        <meta
          name="description"
          content="Learn about Assessly's mission, vision, and commitment to providing secure and smart online examination experiences for students and educators."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-secondaryColor">
        <img
          src={aboutUsImg} // Replace with your own image
          alt="Online exam platform"
          className="w-full h-96 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black px-4">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-primaryColor">Assessly</span>
          </h1>
          <p className="text-xl max-w-2xl">
            Empowering exams with technology — secure, smart, and stress-free.
          </p>
        </div>
      </div>

      {/* Core Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Mission"
            className="w-16 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To deliver a robust online examination ecosystem that promotes
            fairness, ease of use, and actionable insights for both learners and
            educators.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135717.png"
            alt="Vision"
            className="w-16 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To redefine assessments through innovation — building an accessible,
            intelligent, and transparent exam system for a smarter future.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Why Choose Us"
            className="w-16 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Why Choose Assessly?
          </h2>
          <p className="text-gray-600">
            AI-based monitoring, real-time analytics, smooth user experience,
            and fraud-proof exam security — everything you need, all in one
            place.
          </p>
        </div>
      </div>

      {/* Quote / CTA */}
      <div className="bg-primaryColor text-white py-14 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-semibold mb-4">
            "Assessment should be a bridge, not a barrier."
          </h3>
          <p className="text-lg mb-6">
            Join thousands of learners and educators using Assessly to unlock
            better learning outcomes through smarter exams.
          </p>

          <Link
            to={"/register"}
            className="inline-block bg-white text-primaryColor font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Get Started with Assessly
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
