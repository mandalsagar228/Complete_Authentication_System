import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { resetPassword } from "./Forget.schema";

const resetPasswordValue = {
  resetPassword: "",
};

const ForgotPassword = () => {
  //   const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: resetPasswordValue,
      validationSchema: resetPassword,
      onSubmit: (values, action) => {
        console.log(values);

        action.resetForm();
      },
    });
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
            Enter your email address to get OTP:
          </label>
          <input
            type="email"
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
        <div className="mx-2">
          <button
            type="submit"
            className="w-full px-4 py-2  text-white bg-blue-500 rounded-md hover:bg-blue-600 "
          >
            Get OTP
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
