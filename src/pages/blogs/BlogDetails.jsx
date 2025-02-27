const BlogDetails = () => {
  // ****************************
  // const blogData = {
  //   id: 1,
  //   thumbnail: "https://source.unsplash.com/800x400/?education,books",
  //   title: "The Importance of Lifelong Learning",
  //   summary:
  //     "Learning doesn’t stop after school. Discover why lifelong education is key to personal and professional growth.",
  //   author: "John Doe",
  //   authorImage: "https://source.unsplash.com/100x100/?person",
  //   authorBio:
  //     "An educator and writer passionate about lifelong learning and personal growth.",
  //   date: "2025-02-20",
  //   readingTime: "8 min",
  //   toc: [
  //     { title: "Why Lifelong Learning Matters", anchor: "why-learning" },
  //     { title: "Key Benefits of Continuous Learning", anchor: "benefits" },
  //     { title: "How to Start Your Learning Journey", anchor: "how-to-start" },
  //   ],
  //   content: [
  //     {
  //       anchor: "why-learning",
  //       heading: "Why Lifelong Learning Matters",
  //       text: "Education isn't just about getting a degree. It’s about constantly evolving, staying curious, and adapting to new challenges.",
  //     },
  //     {
  //       anchor: "benefits",
  //       heading: "Key Benefits of Continuous Learning",
  //       text: "- Keeps your skills up-to-date in a rapidly changing world.\n- Boosts confidence and career opportunities.\n- Enhances problem-solving and critical thinking skills.",
  //     },
  //     {
  //       anchor: "how-to-start",
  //       heading: "How to Start Your Learning Journey",
  //       text: "- Set learning goals based on your interests.\n- Explore online courses, books, and podcasts.\n- Apply what you learn through practice and teaching others.",
  //       quote:
  //         "The beautiful thing about learning is that no one can take it away from you. – B.B. King",
  //     },
  //   ],
  //   tags: ["Education", "LifelongLearning", "PersonalGrowth"],
  //   relatedArticles: [
  //     { id: 2, title: "The Power of Online Learning" },
  //     { id: 3, title: "Developing a Growth Mindset" },
  //     { id: 4, title: "Top Free Educational Resources" },
  //   ],
  //   comments: [
  //     {
  //       user: "Alice Smith",
  //       text: "Great insights! I love the emphasis on continuous learning.",
  //     },
  //     {
  //       user: "David Johnson",
  //       text: "Thanks for the tips! I'll start setting my learning goals today.",
  //     },
  //   ],
  // };

  // ****************************
  return (
    <div className="mt-20 bg-secondaryColor min-h-screen flex justify-center py-8">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Top Section: Thumbnail, Key Info */}
        <div className="mb-8">
          <img
            src="https://images.pexels.com/photos/4492137/pexels-photo-4492137.jpeg"
            alt="The Importance of Lifelong Learning"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="mt-4 text-sm text-footerTextColor">
            <span>
              By <strong>John Doe</strong>
            </span>{" "}
            |<span> February 20, 2025</span> |<span> 8 min read</span>
          </div>
        </div>

        {/* Blog Title & Summary */}
        <h1 className="text-4xl font-bold text-primaryColor mb-4">
          The Importance of Lifelong Learning
        </h1>
        <p className="text-lg text-gray-700 mb-6 italic">
          Learning doesn’t stop after school. Discover why lifelong education is
          key to personal and professional growth.
        </p>

        {/* Table of Contents */}
        <div className="mb-6 p-4 bg-primaryColor/10 rounded-lg">
          <h2 className="text-lg font-semibold text-primaryColor">
            Table of Contents
          </h2>
          <ul className="list-disc pl-5 text-primaryColor">
            <li>
              <a href="#why-learning" className="hover:underline">
                Why Lifelong Learning Matters
              </a>
            </li>
            <li>
              <a href="#benefits" className="hover:underline">
                Key Benefits of Continuous Learning
              </a>
            </li>
            <li>
              <a href="#how-to-start" className="hover:underline">
                How to Start Your Learning Journey
              </a>
            </li>
          </ul>
        </div>

        {/* Blog Content */}
        <div className="leading-relaxed">
          <div id="why-learning" className="mb-6">
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              Why Lifelong Learning Matters
            </h2>
            <p className="text-footerTextColor">
              Education isn&apos;t just about getting a degree. It’s about
              constantly evolving, staying curious, and adapting to new
              challenges.
            </p>
          </div>

          <div id="benefits" className="mb-6">
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              Key Benefits of Continuous Learning
            </h2>
            <p className="text-footerTextColor">
              - Keeps your skills up-to-date in a rapidly changing world. -
              Boosts confidence and career opportunities. - Enhances
              problem-solving and critical thinking skills.
            </p>
          </div>

          <div id="how-to-start" className="mb-6">
            <h2 className="text-2xl font-semibold text-primaryColor mb-2">
              How to Start Your Learning Journey
            </h2>
            <p className="text-footerTextColor">
              - Set learning goals based on your interests. - Explore online
              courses, books, and podcasts. - Apply what you learn through
              practice and teaching others.
            </p>
            <blockquote className="mt-4 p-4 border-l-4 border-primaryColor bg-gray-100 text-gray-600 italic">
              &quot;The beautiful thing about learning is that no one can take
              it away from you.&quot; – B.B. King
            </blockquote>
          </div>
        </div>

        {/* Tags & Categories */}
        <div className="flex flex-wrap mt-6 gap-2">
          <span className="bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-full text-sm font-medium">
            #Education
          </span>
          <span className="bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-full text-sm font-medium">
            #LifelongLearning
          </span>
          <span className="bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-full text-sm font-medium">
            #PersonalGrowth
          </span>
        </div>

        {/* Related Articles */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-primaryColor mb-4">
            Related Articles
          </h3>
          <ul className="list-disc pl-5 text-primaryColor">
            <li>
              <a href="/blog/2" className="hover:underline text-primaryColor">
                The Power of Online Learning
              </a>
            </li>
            <li>
              <a href="/blog/3" className="hover:underline text-primaryColor">
                Developing a Growth Mindset
              </a>
            </li>
            <li>
              <a href="/blog/4" className="hover:underline text-primaryColor">
                Top Free Educational Resources
              </a>
            </li>
          </ul>
        </div>

        {/* Author Info */}
        <div className="mt-10 p-6 bg-primaryColor/10 rounded-lg flex items-center">
          <img
            src="https://i.ibb.co.com/XxZvYFzS/profile2.jpg"
            alt="John Doe"
            className="w-16 h-16 object-cover rounded-full mr-4"
          />
          <div>
            <h4 className="text-lg font-semibold">Najmul Shaon</h4>
            <p className="text-footerTextColor">
              An educator and writer passionate about lifelong learning and
              personal growth.
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-primaryColor mb-4">
            Comments
          </h3>
          <div className="mb-4">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primaryColor"
              placeholder="Add a comment..."
            ></textarea>

            <button className="btn primary-btn my-4">Submit</button>
          </div>

          <div className="mt-4">
            <div className="border-b py-3">
              <p className="font-semibold">Alice Smith</p>
              <p className="text-gray-700">
                Great insights! I love the emphasis on continuous learning.
              </p>
            </div>
            <div className="border-b py-3">
              <p className="font-semibold">David Johnson</p>
              <p className="text-gray-700">
                Thanks for the tips! I&apos;ll start setting my learning goals
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
