import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { verifyEmail } from "./Schema.verifyEmail";
import { VerifyOTPInServer } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const verifyOTPValue = {
  text: "",
};

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: verifyOTPValue,
      validationSchema: verifyEmail,
      onSubmit: (values, action) => {
        Verify();
        console.log("submited", values);

        action.resetForm();
      },
    });
  console.log(values);

  const Verify = async () => {
    const ResponseForOTP = await VerifyOTPInServer(values);
    console.log(ResponseForOTP);
    if (ResponseForOTP.status === 200) {
      toast.success(ResponseForOTP.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/loginPage");
    } else {
      toast.error(ResponseForOTP.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="  max-w-md mx-auto mt-4 bg-slate-50 py-4 rounded-md    "
      >
        <div className="mb-4 mx-2 ">
          <label
            htmlFor="text"
            className="block mb-1 font-medium text-sm  text-green-600"
          >
            OTP has sent in your email address:
          </label>
          <input
            type="text"
            name="text"
            autoComplete="off"
            placeholder="Enter OTP"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            className={` w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md  focus:outline-none ${
              errors.text && touched.text
                ? "border-red-600"
                : "focus:ring-2 focus:ring-blue-500 "
            }`}
          />
          {errors.text && touched.text ? (
            <p className="text-red-500 text-xs">{`${errors.text}`}</p>
          ) : null}
        </div>
        <div className="mx-2">
          <button
            type="submit"
            className="w-full px-4 py-2  text-white bg-blue-500 rounded-md hover:bg-blue-600 "
          >
            Verify
          </button>
        </div>
      </form>
    </>
  );
};

export default VerifyOTP;
