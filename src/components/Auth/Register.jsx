import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  useAddUserMutation,
  useGoogleLoginMutation,
} from "../../redux/api/userApiSlice";
import { LinearProgress } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { setUserCredentials } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
// import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const [addUser, { isLoading, isError }] = useAddUserMutation();
  const [googleLogin, { isLoading: isAddLoading }] = useGoogleLoginMutation();
  // const [googleUser, setGoogleUser] = useState(null);
  const dispatch = useDispatch();

  if (isLoading || isAddLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  //now try
  const handleSuccess = (response) => {
    console.log("Login Success=>:", response);
    const { credential } = response;

    // Decode the token to get user information
    const user = jwtDecode(credential);
    console.log("user google ", user);
    // setGoogleUser(user);
    // setOpenModal(true);
    handleRegisterAndLogin(user);
  };

  const handleFailure = () => {
    console.log("Login Failed");
    toast.error("Login Failed");
  };

  //here handle user login if the user is already exist
  const handleRegisterAndLogin = async (user) => {
    try {
      // const { password, confirmPassword } = values;

      // if (password !== confirmPassword) {
      //   toast.error("Passwords do not match!");
      //   return;
      // }

      // Register the user in the backend
      const userResponse = await googleLogin({
        user: { name: user.name, email: user.email, photo: null },
      }).unwrap();

      if (userResponse) {
        // If registration is successful, log in the user

        // const loginResponse = await login({
        //   email: googleUser.email,
        //   password,
        // }).unwrap();

        if (userResponse.token) {
          dispatch(
            setUserCredentials({
              user_id: userResponse.useremail.user_id,
              user: userResponse.useremail.full_name,
              email: userResponse.useremail.email,
              token: userResponse.token,
            })
          );
          toast.success("Successfully logged in!");
          navigate("/");
        } else {
          throw new Error("Login after registration failed");
        }
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration or login", error);
      toast.error("Failed to register or login");
    }
  };

  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensure passwords match
      .required("Confirm password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      setSubmitting(true);
      const { confirmPassword, ...dataToSubmit } = values;
      console.log("Data submitted to the server", dataToSubmit);
      console.log("confirmpassword", confirmPassword);

      const res = await addUser(dataToSubmit);
      console.log("res: ", res);
      toast.success("Registration successful!");
      navigate("/login");
      resetForm();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed: " + error.message);
      setErrors({ api: "Registration failed. Please try again later." });
    }
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      <div
        className="relative h-56 p-8 bg-cover bg-center rounded-md overflow-hidden"
        style={{ backgroundImage: `url("/images/geez.webp")` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Image fills this div */}
      </div>

      {/* Form starts overlapping the image */}
      <div className="max-w-md md:w-[22rem] mx-auto mt-[-5rem] bg-white rounded-lg shadow-lg p-4 relative ">
        <div className="flex flex-col items-center justify-center bg-blue-500 p-4 text-center text-white rounded-lg min-h-40 shadow-xl mt-[-50px] ">
          <h4 className="text-2xl font-bold pb-4">Join us today</h4>
          <GoogleLogin
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full border-8"
              >
                Sign in with Google
              </button>
            )}
          />
          <p className="text-sm">Enter your email and password to register</p>
        </div>
        <div className="p-4 pb-8 mt-6 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8  ">
                <div className="relative h-11 w-full min-w-[200px]">
                  <Field
                    name="full_name"
                    type="text"
                    placeholder="Name"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Full Name
                  </label>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-md italic"
                  />
                </div>

                <div className="relative h-11 w-full min-w-[200px]">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-md italic"
                  />
                </div>

                <div className="relative h-11 w-full min-w-[200px]">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-md italic"
                  />
                </div>

                <div className="relative h-11 w-full min-w-[200px]">
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Confirm Password
                  </label>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-md italic"
                  />
                </div>

                <div className="hidden flex items-center mb-4 mt-4">
                  <Field
                    type="checkbox"
                    name="agree"
                    className="checkbox checkbox-primary"
                  />
                  <span className="pl-2 cursor-pointer text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-blue-500 font-bold">
                      Terms and Conditions
                    </a>
                  </span>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting
                        ? "bg-gray-500 hover:bg-gray-600 active:bg-gray-600"
                        : "bg-blue-500 hover:bg-blue-600 active:bg-blue-600"
                    }  w-full text-white font-bold uppercase text-sm px-6 py-2.5 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
