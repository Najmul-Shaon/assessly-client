const CountdownMessage = ({ countdown }) => {
  const messages = {
    3: "Get Ready! Exam will start soon...",
    2: "Stay Focused. Preparing your exam...",
    1: "Starting Exam Now!",
  };

  return (
    <div className="text-center text-2xl font-semibold text-textLightPrimary">
      {messages[countdown]}
    </div>
  );
};

export default CountdownMessage;
