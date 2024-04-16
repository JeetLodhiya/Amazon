// React import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// MUI import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Third Prty Library
import { useFormik } from "formik";

//Component import
import { signUpSchemas } from "../schemas";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showcPassword, setShowcPassword] = useState(false);
  const handleClickShowcPassword = () => setShowcPassword(!showcPassword);
  const handleMouseDowncPassword = () => setShowcPassword(!showcPassword);

  const navigate = useNavigate();

  const { values, handleBlur, touched, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues,
      validationSchema: signUpSchemas,
      onSubmit: (values) => {
        let user = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        const userDetail = JSON.parse(localStorage.getItem("users"));

        // console.log("userDetail", userDetail);
        localStorage.setItem(
          "users",
          userDetail
            ? JSON.stringify([...userDetail, user])
            : JSON.stringify([user])
        );

        // console.log("userDetail: ", userDetail);

        navigate("/login");
      },
    });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
          p: 5,
          backgroundImage: "linear-gradient(135deg, #007991 30%, #78ffd6 90%)",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid gray",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h5">Sign Up</Typography>
            <CardContent>
              <TextField
                id="name"
                label="Name"
                size="small"
                type="text"
                name="name"
                fullWidth
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.name && touched.name ? errors.name : null}
                error={touched.name ? errors.name : null}
              />
              <br />
              <br />
              <TextField
                id="email"
                label="Email"
                size="small"
                type="email"
                name="email"
                fullWidth
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.email && touched.email ? errors.email : null}
                error={touched.email ? errors.email : null}
              />
              <br />
              <br />
              <TextField
                id="password"
                label="Password"
                size="small"
                name="password"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors.password && touched.password ? errors.password : null
                }
                error={touched.password ? errors.password : null}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ p: 0 }}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <br />
              <TextField
                id="cpassword"
                label="Confirm Password"
                size="small"
                name="cpassword"
                fullWidth
                type={showcPassword ? "text" : "password"}
                value={values.cpassword}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  errors.cpassword && touched.cpassword
                    ? errors.cpassword
                    : null
                }
                error={touched.cpassword ? errors.cpassword : null}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowcPassword}
                        onMouseDown={handleMouseDowncPassword}
                        sx={{ p: 0 }}
                      >
                        {showcPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mb: 1 }}
              >
                Sign Up
              </Button>
            </CardActions>
          </form>

          <Typography component="div">
            Are you allready user?
            <Typography
              sx={{ textDecoration: "none", ml: 1 }}
              component={Link}
              to="/login"
            >
              Sign in
            </Typography>
          </Typography>
        </Card>
      </Box>
    </>
  );
};

export default Register;
