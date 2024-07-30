import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button, Inputbox, Quote } from "../components";
import axios, { AxiosError } from "axios";
import { URL } from "../constants/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { SigninInput } from "@parik100x/medium-common-app";

function Signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SigninInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SigninInput> = async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/user/signin`,
        {
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
        alert("Error submitting form");
      }
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Signin */}
      <div className="col-span-1 flex justify-center flex-col items-center min-h-screen">
        <div className="w-1/2 min-w-80">
          {/* Heading */}
          <div className="flex flex-col items-center space-y-1 pb-5">
            <h1 className="font-bold text-4xl">Create an account</h1>
            <h2 className="text-gray-500 text-lg">
              New to Medium?{" "}
              <Link to={"/signup"} className="underline">
                Signup
              </Link>
            </h2>
          </div>
          {/* Signin Form*/}
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-5"
            >
              <Inputbox
                id={uuid()}
                label="Email"
                placeholder="Enter your email"
                reg={{ ...register("email") }}
              />
              <Inputbox
                id={uuid()}
                label="Password"
                placeholder="password"
                type="password"
                reg={{ ...register("password") }}
              />
              <Button
                isSubmitting={isSubmitting}
                isSubmittingLabel="Loading..."
                label="Sign In"
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
      {/* Quote */}
      <div className="col-span-1 min-h-screen">
        <Quote
          person={"Jeff Bezos"}
          company={"Amazon"}
          statememt={
            "I believe you have to be willing to be misunderstood if you're going to innovate"
          }
        />
      </div>
    </div>
  );
}

export default Signin;
