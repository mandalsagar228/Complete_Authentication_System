import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email().required("Enter the email address"),
  password: Yup.string().min(8).required("Enter Password"),
});
