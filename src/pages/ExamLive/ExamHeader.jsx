const ExamHeader = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base lg:text-xl font-semibold text-primaryColor">
        Exam Started
      </h2>
      <span className="font-mono text-lg text-accentColor">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default ExamHeader;
