import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button, Inputbox, Quote } from "../components";

function Signin() {
  const [name, setName] = useState<string>(); //    username or email
  const [password, setPassword] = useState<string>();
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 flex justify-center flex-col items-center">
        <div className="w-1/2 min-w-80">
          <div className="flex flex-col items-center space-y-1 pb-5">
            <h1 className="font-bold text-4xl">Create an account</h1>
            <h2 className="text-gray-500 text-lg">
              Already have an Account?{" "}
              <Link to={"/signup"} className="underline">
                Signin
              </Link>
            </h2>
          </div>
          <div className="flex flex-col space-y-5">
            <Inputbox
              id={uuid()}
              label="Username or Email"
              placeholder="Enter your username or email"
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
            <Button label="Sign In" onClick={async () => {}} />
          </div>
        </div>
      </div>
      <div className="col-span-1 min-h-screen">
        <Quote person={"dz"} company={"das"} statememt={"das"} />
      </div>
    </div>
  );
}

export default Signin;
