import * as Yup from "yup";

export const verifyEmail = Yup.object({
  text: Yup.string().min(6).required("Enter OTP sent in your email address"),
});
