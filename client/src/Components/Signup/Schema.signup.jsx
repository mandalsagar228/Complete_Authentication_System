import * as Yup from "yup";
export const signUpSchema = Yup.object({
  firstname: Yup.string().min(2).max(25).required("Enter the firstname"),
  lastname: Yup.string().min(2).max(25).required("Enter the lastname"),
  email: Yup.string().email().required("Enter the email address"),
  password: Yup.string().min(8).required("Enter Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must  match"),
});
