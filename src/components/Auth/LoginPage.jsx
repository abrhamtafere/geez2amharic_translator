import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../redux/slice/authSlice";
import {
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
// for google auth
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../../redux/api/userApiSlice";
import { BiShow, BiHide } from "react-icons/bi";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: isAddLoading }] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [googleUser, setGoogleUser] = useState(null);

  if (isLoading || isAddLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

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

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //here handle user login if the user is already exist
  const handleRegisterAndLogin = async (user) => {
    try {
      // Register the user in the backend
      const userResponse = await googleLogin({
        user: { name: user.name, email: user.email, photo: null },
      }).unwrap();

      // Retry mechanism to wait for userResponse.user
      const maxRetries = 5;
      const retryDelay = 1000; // 1 second
      let retries = 0;

      while (!userResponse.useremail && retries < maxRetries) {
        console.log(
          `Retrying to fetch user data (${retries + 1}/${maxRetries})...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        retries += 1;
      }
 
      if (userResponse.useremail) {
        dispatch(
          setUserCredentials({
            user_id: userResponse.useremail.user_id,
            user: userResponse.useremail.full_name,
            email: userResponse.useremail.email,
            token: userResponse.token,
            rememberMe: false,
          })
        );
        console.log("output: ", userResponse);
        toast.success("Successfully logged in!");
        navigate("/");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration or login", error);
      toast.error("Failed to register or login");
    }
  };

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { rememberMe, ...dataSubmitted } = values;
      const res = await login(dataSubmitted).unwrap();
      console.log("check token: res = ", res);
      console.log("check token: res = ", res.token);
      if (res.token) {
        dispatch(
          setUserCredentials({
            user_id: res.user_info.user_id,
            user: res.user_info.full_name,
            email: res.user_info.email,
            token: res.token,
            rememberMe,
          })
        );
        toast.success("Successfully logged in!");
        navigate("/");
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login Failed: use the correct credentials!");
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
      </div>

      <div className="max-w-md md:w-[21rem] mx-auto mt-[-5rem] bg-white rounded-lg shadow-lg p-4 relative ">
        <div className="flex flex-col items-center justify-center bg-blue-500 p-4 text-center text-white rounded-lg min-h-40 shadow-xl mt-[-50px]">
          <h4 className="text-2xl font-bold pb-4">Sign In</h4>
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
        </div>
        <div className="p-4 pb-8 mt-6 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="flex flex-col gap-4">
              <div className="relative h-11 w-full min-w-[200px]">
                <Field
                  type="email"
                  name="email"
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
                  type="password"
                  name="password"
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

              <div className="flex items-center mb-4 mt-4 hidden ">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="remember-me"
                  className="sr-only"
                />
                <label
                  htmlFor="remember-me"
                  className="relative flex items-center justify-center cursor-pointer block bg-gray-300 rounded-full w-9 h-4 transition duration-200 ease-in-out"
                >
                  <span className="absolute left-0 bg-white border-2 border-gray-300 rounded-full w-5 h-5 transition transform duration-100 ease-in-out"></span>
                </label>
                <label
                  htmlFor="remember-me"
                  className=" ml-3 text-sm text-gray-600 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 w-full hover:bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-2.5 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Sign In
                </button>
              </div>
            </Form>
          </Formik>
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Don&rsquo;t have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={Yup.object({
              password: Yup.string().required("Password is required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleRegisterAndLogin(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div className="relative h-11 w-full min-w-[200px]">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                  <IconButton
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </IconButton>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-md italic"
                  />
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Confirm Password
                  </label>
                  <IconButton
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                    onClick={handleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <BiHide /> : <BiShow />}
                  </IconButton>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-md italic"
                  />
                </div>
                <DialogActions>
                  <Button onClick={() => setOpenModal(false)} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};
