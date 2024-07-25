import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

function Appbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/publish");
  };
  return (
    <div>
      <div className="flex justify-between py-4 px-10 items-center">
        <Link to={"/blogs"}>
          <h1 className="font-semibold text-3xl">Medium</h1>
        </Link>
        <div className="flex items-center space-x-3">
          {location.pathname.slice(1) === "blogs" ? (
            <button
              className="bg-green-600 rounded-full px-3 py-1 text-white"
              onClick={handleClick}
            >
              New
            </button>
          ) : null}
          <Link to={"/profile"}>
            <Avatar character={"P"} className="p-4"/>
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Appbar;
