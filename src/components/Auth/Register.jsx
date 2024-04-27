import { Link } from "react-router-dom";

export const Register = () => {
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
        <div className="flex flex-col items-center justify-center bg-blue-500 p-4 text-center text-white rounded-lg min-h-40 shadow-xl mt-[-50px] ">
          <h4 className="text-2xl font-bold pb-4">Join us today</h4>
          <p className="text-sm">Enter your email and password to register</p>
        </div>
        <div className="p-4 pb-8 mt-6 ">
          <form className="flex flex-col gap-4  ">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                placeholder="Name"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Name
              </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="email"
                placeholder="Email"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                placeholder="Password"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <label className="label pl-2 cursor-pointer text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-500 font-bold">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div>
              <button className="bg-blue-500 w-full hover:bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-2.5 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Sign Up
              </button>
            </div>
            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link
                  to="/authentication/sign-in"
                  className="text-blue-500 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
