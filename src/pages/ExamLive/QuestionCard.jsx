import { FaCheck } from "react-icons/fa";

const QuestionCard = ({
  currentQuestionIndex,
  question,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded-xl bg-secondaryColor">
      <p className="font-medium text-lg mb-2">
        Question {currentQuestionIndex + 1}
      </p>
      <p className="text-gray-800 font-semibold mb-4">
        {currentQuestionIndex + 1}. {question.question}
      </p>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {["A", "B", "C", "D"].map((option) => (
          <div
            key={option}
            className={`p-4 border rounded-lg cursor-pointer hover:bg-primaryColor/10 transition ${
              selectedOption === option
                ? "bg-primaryColor/10 border-primaryColor"
                : "bg-white border-gray-300"
            }`}
            onClick={() => onOptionSelect(option)}
          >
            <div className="flex items-center">
              {selectedOption === option && (
                <FaCheck className="text-green-600 mr-2" />
              )}
              <span className="font-medium text-lg">
                {question[option.toLowerCase()]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
