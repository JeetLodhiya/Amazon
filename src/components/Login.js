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
import { signInSchemas } from "../schemas";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const userDetail = JSON.parse(localStorage.getItem("users"));

  // console.log("userDetail: ", userDetail);

  const { values, touched, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchemas,
      onSubmit: (value) => {
        const result = userDetail.filter(
          (item) => item.email == value.email && item.password == value.password
        );

        if (result.length > 0) {
          localStorage.setItem("login", true);
          navigate("/");
          let loggedin = result[0];
          localStorage.setItem("loggedin", JSON.stringify(loggedin));
          // console.log("loggin:::", loggedin);
          // console.log("Ready:::: ", result[0]);
        } else {
          // console.log("Try again:::");
        }
      },
    });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          mt: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            <Typography variant="h5" sx={{ mt: 2 }}>
              Sign In
            </Typography>
            <CardContent>
              <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                fullWidth
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.email ? errors.email : null}
                error={touched.email ? errors.email : null}
                sx={{ mb: 2 }}
              />
              <br />
              <TextField
                id="password"
                label="Password"
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
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
                mb: 1,
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Sign in
              </Button>
            </CardActions>
          </form>

          <Box>
            <Typography component="div" sx={{ mb: 2 }}>
              Are you not user?
              <Typography
                sx={{ textDecoration: "none", ml: 1 }}
                component={Link}
                to="/register"
              >
                Register
              </Typography>
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Login;
