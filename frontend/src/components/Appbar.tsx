import { Link, useLocation, useNavigate } from "react-router-dom";

function Appbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/publish")
  }
  return (
    <div>
      <div className="flex justify-between py-4 px-10 items-center">
        <Link to={"/blogs"}>
          <h1 className="font-semibold text-3xl">Medium</h1>
        </Link>
        <div className="flex items-center space-x-2">
          {location.pathname.slice(1) === "blogs" ? (
            <button className="bg-green-600 rounded-full px-3 py-1 text-white" onClick={handleClick}>New</button>
          ) : null}
          <div className="flex flex-col justify-center items-center bg-gray-500 rounded-full w-6 h-6 p-4">
            <p className="text-white">P</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Appbar;
