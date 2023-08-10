import { useFormik } from "formik";
import { ValidateResetPassword } from "./Schema.reset";
// import { signUpSchema } from "../../Signup/Schema.signup";
import { SendResetPassword } from "../../Services/api";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const resetPasswordValue = {
  password: "",
  confirmPassword: "",
};

const Reset = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: resetPasswordValue,
      validationSchema: ValidateResetPassword,
      onSubmit: (values, action) => {
        ResetPassword();
        console.log(values);

        action.resetForm();
      },
    });

  const ResetPassword = () => {
    const ResponseForResetPassoword = SendResetPassword(values);
    if (ResponseForResetPassoword) {
      toast.success("Password updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/welcome");
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
            htmlFor="password"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Reset Password:
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Reset Password"
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

        <div className="mb-4 mx-2">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 font-medium text-sm text-gray-700"
          >
            Reset Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="off"
            placeholder="Reset confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }`}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="text-red-500 text-xs">{`${errors.confirmPassword}`}</p>
          ) : null}
        </div>
        <div className="mx-2">
          <button
            type="submit"
            className="w-full px-4 py-2  text-white bg-blue-500 rounded-md hover:bg-blue-600 "
          >
            Reset Confirm Password
          </button>
        </div>
      </form>
    </>
  );
};

export default Reset;
