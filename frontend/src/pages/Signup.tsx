import { Link, useNavigate } from "react-router-dom";
import { Button, Inputbox, Quote } from "../components";
import { v4 as uuid } from "uuid";
import axios, { AxiosError } from "axios";
import { URL } from "../constants/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupInput } from "@parik100x/medium-common-app";

function Signup() {
  // const [username, setUsername] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignupInput>();

  const onSubmit: SubmitHandler<SignupInput> = async ({
    name,
    email,
    password,
  }) => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/user/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/blogs");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("error: ", error.response?.data.error);
        setError("root", {
          message: error.response?.data.error,
        });
      } else {
        alert("Error Submitting form");
      }
    }
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
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-5"
            >
              <Inputbox
                id={uuid()}
                label="Name"
                placeholder="Enter your name"
                reg={{ ...register("name") }}
              />
              <Inputbox
                id={uuid()}
                label="Email"
                placeholder="m@example.com"
                reg={{ ...register("email") }}
              />
              <Inputbox
                id={uuid()}
                label="Password"
                type="password"
                placeholder="password"
                reg={{ ...register("password") }}
              />
              <Button
                label="Sign Up"
                isSubmitting={isSubmitting}
                isSubmittingLabel="Loading..."
                type="submit"
              />
              {errors.root && (
                <div className="text-red-500 text-sm">
                  {errors.root.message}
                </div>
              )}
            </form>
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
