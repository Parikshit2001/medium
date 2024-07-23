import { Link, useNavigate } from "react-router-dom";
import { Button, Inputbox, Quote } from "../components";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import axios from "axios";
import { URL } from "../constants/constants";

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()

  const handleClick = async () => {
    axios
      .post(`${URL}/api/v1/user/signup`, {
        name: username,
        email,
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
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 flex justify-center flex-col items-center min-h-screen">
        <div className="w-1/2 min-w-80">
          <div className="flex flex-col items-center space-y-1 pb-5">
            <h1 className="font-bold text-4xl">Create an account</h1>
            <h2 className="text-gray-500 text-lg">
              Already have an Account?{" "}
              <Link to={"/signin"} className="underline">
                Signin
              </Link>
            </h2>
          </div>
          <div className="flex flex-col space-y-5">
            <Inputbox
              id={uuid()}
              label="Username"
              placeholder="Enter your username"
              value={username}
              setValue={setUsername}
            />
            <Inputbox
              value={email}
              setValue={setEmail}
              id={uuid()}
              label="Email"
              placeholder="m@example.com"
            />
            <Inputbox
              value={password}
              setValue={setPassword}
              id={uuid()}
              label="Password"
              type="password"
            />
            <Button label="Sign Up" onClick={handleClick} />
          </div>
        </div>
      </div>
      <div className="col-span-1 min-h-screen">
        <Quote
          person={"Jules Winnfield"}
          statememt={
            "The customer service I received was exceptional. The support team went above and beyond to address my concern."
          }
          company={"CEO, Acme Inc"}
        />
      </div>
    </div>
  );
}

export default Signup;
