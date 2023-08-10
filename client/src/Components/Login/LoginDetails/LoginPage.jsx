import { useFormik } from "formik";
import { LoginSchema } from "./Login.schema";
import { useNavigate, NavLink } from "react-router-dom";
import { sendingLoginData } from "../../Services/api";
import { toast } from "react-toastify";

const loginValue = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: loginValue,
      validationSchema: LoginSchema,
      onSubmit: (values, action) => {
        console.log(values);
        loginDetails();

        action.resetForm();
      },
    });
  console.log(values);

  const loginDetails = async () => {
    try {
      const loginResponse = await sendingLoginData(values);
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        toast.success(loginResponse.data.msg, {
          position: toast.POSITION.TOP_LEFT,
        }),
          navigate("/welcome");
      } else {
        toast.error(loginResponse.data.msg, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } catch (error) {
      console.log("something went  wrong while login", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-4 bg-slate-50 py-4 rounded-lg   "
      >
        <div className="mb-4 mx-2">
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Email:
          </label>
          <input
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Enter Your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.email && touched.email
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }`}
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 text-xs">{`${errors.email}`}</p>
          ) : null}
        </div>
        <div className=" mx-2 ">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.password && touched.password
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }`}
          />
          {errors.password && touched.password ? (
            <p className="text-red-500 text-xs">{`${errors.password}`}</p>
          ) : null}
        </div>
        <div className="px-3 mb-4">
          <span className=" text-blue-700">
            <NavLink to={"/forgotPassword"}> Forgot password ?</NavLink>
          </span>
        </div>
        <div className="mb-4 mx-2 flex items-center justify-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have account ? &nbsp;
          <span className=" text-blue-700">
            <NavLink to={"/signup"}>Create Account</NavLink>
          </span>
        </div>

        <div className="mb-4 mx-2 flex items-center justify-center">OR</div>
        <div className="mb-4 mx-2 flex items-center justify-center">
          Sign in with Google
        </div>

        <div className="mx-2">
          <button
            type="submit"
            className="w-full px-4 py-2  text-white bg-blue-500 rounded-md hover:bg-blue-600 "
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
