import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchemas = Yup.object({
  name: Yup.string().min(3).required("Please Enter name"),
  email: Yup.string()
    .email("Please Enter Valid email")
    .required("Please Enter Email"),
  password: Yup.string().min(5).required("Please Enter Password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please Re-Enter Password"),
});

export const signInSchemas = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid email")
    .required("Please Enter Email"),
  password: Yup.string().min(5).required("Please Enter Password"),
});

export const orderFormSchemas = Yup.object({
  fname: Yup.string().min(3).required("Please Enter First name"),
  lname: Yup.string().min(2).required("Please Enter Last name"),
  address: Yup.string().min(5).required("Please Enter Address"),
  mnumber: Yup.string()
    .required("Please Enter Phone number")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
});
