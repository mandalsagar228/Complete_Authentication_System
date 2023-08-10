import { sendingSignupData } from "../Services/api";
import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "./Schema.signup";

import { toast } from "react-toastify";

const signupInitialValue = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupPage = () => {
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: signupInitialValue,
      validationSchema: signUpSchema,

      onSubmit: async (values, action) => {
        console.log("This is  onsubmit value:", values);
        signUpDetails();

        action.resetForm();
      },
    });
  const navigate = useNavigate();

  // sending signupdetails to server
  const signUpDetails = async () => {
    try {
      const response = await sendingSignupData(values);
      if (response.status === 201) {
        toast.success(response.data.msg, { position: toast.POSITION.TOP_LEFT });
        toast.info("OTP has sent in you email address", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });

        console.log(response.data.msg, response);

        navigate("/verifyOTP");
      } else {
        toast.error(response.data.msg, { position: toast.POSITION.TOP_LEFT });
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log("somthing went wrong with api", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-4 bg-slate-50 py-4 rounded-lg   "
      >
        {/* <div>This is a msg</div> */}
        <div className="mb-4 mx-2">
          <label
            htmlFor="firstname"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Firstname:
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="Enter Your username"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.firstname && touched.firstname
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }  `}
          />
          {errors.firstname && touched.firstname ? (
            <p className="text-red-500 text-xs">{`${errors.firstname}`}</p>
          ) : null}
        </div>
        <div className="mb-4 mx-2">
          <label
            htmlFor="lastname"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Lastname:
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter Your username"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.lastname && touched.lastname
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }`}
          />
          {errors.lastname && touched.lastname ? (
            <p className="text-red-500 text-xs">{`${errors.lastname}  `}</p>
          ) : null}
        </div>

        <div className="mb-4 mx-2">
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            // value={signupInitialValue.email}
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
            <p className="text-red-500 text-xs">{`${errors.email}  `}</p>
          ) : null}
        </div>

        <div className="mb-4 mx-2">
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
            placeholder="Enter the Password   "
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`  w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.password && touched.password
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }`}
          />

          {errors.password && touched.password ? (
            <p className="text-red-500 text-xs">{`${errors.password}  `}</p>
          ) : null}
        </div>

        <div className="mb-4 mx-2">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Confirm password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="off"
            placeholder="Enter Your confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 ${
              errors.confirmPassword && touched.confirmPassword
                ? "border border-red-600"
                : "focus:ring-blue-500 "
            }  `}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="text-red-500 text-xs">{`${errors.confirmPassword}  `}</p>
          ) : null}
        </div>

        <div className="mb-4 mx-2 flex items-center justify-center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Already have account ? &nbsp;
          <span className=" text-blue-700">
            <NavLink to={"/LoginPage"}>Login</NavLink>
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
            Signup
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
