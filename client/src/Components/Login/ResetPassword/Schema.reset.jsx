import * as Yup from "yup";

export const ValidateResetPassword = Yup.object({
  password: Yup.string().min(8).required("Enter Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must  match"),
});
