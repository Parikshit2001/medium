import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button, Inputbox, Quote } from "../components";
import axios from "axios";
import { URL } from "../constants/constants";

function Signin() {
  const [name, setName] = useState<string>(""); //    username or email
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()

  const handleClick = async () => {
    axios
      .post(`${URL}/api/v1/user/signin`, {
        email: name,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwt);
        navigate("/blogs")
      })
      .catch((response) => {
        alert(response.response.data.error)
      })
      .finally(() => {
        setName("");
        setPassword("");
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 flex justify-center flex-col items-center min-h-screen">
        <div className="w-1/2 min-w-80">
          <div className="flex flex-col items-center space-y-1 pb-5">
            <h1 className="font-bold text-4xl">Create an account</h1>
            <h2 className="text-gray-500 text-lg">
              New to Medium?{" "}
              <Link to={"/signup"} className="underline">
                Signup
              </Link>
            </h2>
          </div>
          <div className="flex flex-col space-y-5">
            <Inputbox
              id={uuid()}
              label="Email"
              placeholder="Enter your email"
              value={name}
              setValue={setName}
            />
            <Inputbox
              value={password}
              setValue={setPassword}
              id={uuid()}
              label="Password"
              type="password"
            />
            <Button label="Sign In" onClick={handleClick} />
          </div>
        </div>
      </div>
      <div className="col-span-1 min-h-screen">
        <Quote person={"Jeff Bezos"} company={"Amazon"} statememt={"I believe you have to be willing to be misunderstood if you're going to innovate"} />
      </div>
    </div>
  );
}

export default Signin;
