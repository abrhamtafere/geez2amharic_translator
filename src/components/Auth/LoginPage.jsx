import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../redux/slice/authSlice";
import { LinearProgress } from "@mui/material";
// for google auth
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  //now try
  const handleSuccess = (response) => {
    console.log("Login Success=>:", response);
    const { credential } = response;

    // Decode the token to get user information
    const user = jwtDecode(credential);
    console.log("User:", user);

    // Access token and user info
    const token = credential;
    const username = user.name;
    const email = user.email;

    console.log("Token:", token);
    console.log("Username:", username);
    console.log("Email:", email);

    //set creadentials
    dispatch(
      setUserCredentials({
        user: username,
        user_id: email,
        token: token,
      })
    );
    toast.success("Successfully Login!");
    navigate("/");
  };

  const handleFailure = () => {
    console.log("Login Failed");
    toast.error("Login Failed");
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
      // eslint-disable-next-line no-unused-vars
      const { rememberMe, ...dataSubmited } = values;
      // Call the login mutation with form values
      const res = await login(dataSubmited).unwrap(); // unwrap is used  to get the actual data or error
      console.log("data submitted = ", res.token);
      if (res.token) {
        console.log("enjoy man: ", res);
        console.log("name: ", res.user_info.full_name);
        dispatch(
          setUserCredentials({
            user: res.user_info.full_name,
            user_id: res.user_info.user_id,
            token: res.token,
          })
        );
        console.log("Login successful", res);
      } else {
        throw new Error(res.message || "Login failed");
      }
      // console.log("Login successful", result);
      toast.success("Successfully Login!");
      navigate("/");
      // Handle post-login logic here, such as redirecting the user or storing login data
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login Failed use the correct crendentials!");
      // Optionally handle errors, such as displaying a notification
    }
    setSubmitting(false); // Ensure submission flag is reset whether login succeeds or fails
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      <div
        className="h-56 p-8 bg-cover bg-center rounded-md overflow-hidden"
        style={{ backgroundImage: `url("/images/bg-sign-up-cover.jpeg")` }}
      >
        {/* Image fills this div */}
      </div>

      {/* Form starts overlapping the image */}
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

              <div className="flex items-center mb-4 mt-4">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="remember-me"
                  className="sr-only"
                />{" "}
                {/* Hidden checkbox */}
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
    </div>
  );
};
