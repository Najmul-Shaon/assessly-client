import { Link } from "react-router-dom";
import errorImage from "../../assets/404.gif";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <figure className="w-1/2">
        <img src={errorImage} className="w-full" alt="" />
      </figure>
      <Link to="/">
        <button className="btn accent-btn rounded-xl">Back to Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
