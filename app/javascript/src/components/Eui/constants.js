import * as yup from "yup";

export const PASSWORD_SCREEN_VALIDATION_SCHEMA = yup.object().shape({
  password: yup.string().required("Password is required"),
});
