import * as Yup from "yup";

export const resetPassword = Yup.object({
  email: Yup.string().email().required("Enter the email address"),
});
