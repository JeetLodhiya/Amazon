// React import
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Third Prty Library
import { useFormik } from "formik";

//Component import
import { orderFormSchemas } from "../schemas";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  address: "",
  mnumber: "",
};

const OrderPage = () => {
  // State
  const logName = JSON.parse(localStorage.getItem("loggedin"));

  const users = JSON.parse(localStorage.getItem("users"));

  const loggedin = JSON.parse(localStorage.getItem("loggedin"));

  const checkUser = users?.find(
    (item) => item?.name === logName?.name && item?.email === logName?.email
  );

  useEffect(() => {
    if (logName) {
      formik.setFieldValue("fname", logName.name);
    }
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: orderFormSchemas,
    onSubmit: (values) => {
      const form = {
        fname: values.fname,
        lname: values.lname,
        address: values.address,
        mnumber: values.mnumber,
      };
      handleButtonClick();
    },
  });

  const location = useLocation();

  let arr = location?.state;
  // console.log("state:::", location.state);

  let ans = Array.isArray(arr);

  // console.log("Output for Array: " + ans);

  const getTotal = () => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  const handleButtonClick = () => {
    if (checkUser) {
      const userIndex = users?.findIndex(
        (item) =>
          item?.name === loggedin?.name && item?.email === loggedin?.email
      );
      // console.log("User:::", checkUser);
      if (!users[userIndex]?.order) {
        users[userIndex].order = [];
      }
      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = currentDate.toLocaleString("default", { month: "long" });
      const time = currentDate.toLocaleTimeString();
      const dateTime = `${date} ${month}, ${time}`;
      if (location.state.length > 1) {
        location.state.map((item) => {
          users[userIndex].order.push({
            ...item,
            dateTime: dateTime,
          });
        });
      } else {
        const single = location.state;
        // console.log("single11:::", single);
        single.dateTime = dateTime;
        users[userIndex]?.order.push(single);
      }
      localStorage?.setItem("users", JSON.stringify(users));
      navigate("/");
    }
  };

  // console.log("Date::::", dateTime);

  return (
    <>
      <Box
        sx={{
          mt: 3,
          ml: 3,
          height: 30,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          sx={{
            width: 120,
            borderRadius: 6,
            height: "48px",
          }}
        >
          Back
        </Button>
      </Box>
      <Box
        sx={{
          mt: 8,
        }}
      >
        <Grid
          container
          sx={{
            gap: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={3} md={4}>
            <Box sx={{ border: "1px solid gray", height: "auto" }}>
              <Box sx={{ fontSize: 25, mt: 2 }}>Fill the Details</Box>
              <TextField
                id="fname"
                label="First Name"
                size="small"
                type="text"
                name="fname"
                color="secondary"
                value={formik.values.fname}
                onChange={formik.handleChange}
                error={formik.touched.fname && Boolean(formik.errors.fname)}
                helperText={formik.touched.fname && formik.errors.fname}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  m: 3,
                  mt: 7,
                }}
              />
              <TextField
                id="lname"
                label="Last Name"
                size="small"
                type="text"
                name="lname"
                color="secondary"
                value={formik.values.lname}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.lname && formik.errors.lname}
                error={formik.touched.lname && formik.errors.lname}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  m: 3,
                }}
              />
              <TextField
                id="address"
                label="Address"
                size="small"
                type="text"
                name="address"
                color="secondary"
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.address && formik.errors.address}
                error={formik.touched.address && formik.errors.address}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  m: 3,
                }}
              />
              <TextField
                id="mnumber"
                label="Mobile No."
                size="small"
                type="text"
                name="mnumber"
                color="secondary"
                value={formik.values.mnumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.mnumber && formik.errors.mnumber}
                error={formik.touched.mnumber && formik.errors.mnumber}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  m: 3,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <Box sx={{ border: "1px solid gray", height: "auto" }}>
              <Typography sx={{ fontSize: 25, mt: 2, mb: 3 }}>
                Order Summary
              </Typography>
              <Grid
                sx={{
                  gap: 2,
                  display: "flex",
                }}
              >
                <Grid item xs={12} sm={3} md={6}>
                  <Box>
                    <Typography sx={{ mb: 1 }}> Items :</Typography>
                    <Typography sx={{ mb: 1 }}> Total :</Typography>
                  </Box>
                  <Box>
                    <FormControl sx={{ mb: 1 }}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Payment Type
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="cash"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="Cash on Delivary"
                          value="cash"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Credit"
                          value="credit"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Online Payment"
                          value="online"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {!ans && <Box sx={{ mb: 1 }}>1</Box>}
                  {ans && (
                    <Box>
                      <Typography sx={{ mb: 1 }}>
                        {checkUser?.cart?.length}
                      </Typography>
                      <Typography>{getTotal()}</Typography>
                    </Box>
                  )}
                  <Box>{location?.state?.price}</Box>
                </Grid>
              </Grid>
              <Box>
                <Button
                  onClick={() => formik.handleSubmit()}
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffa41c !important",
                    maxwidth: 200,
                    color: "black",
                    borderRadius: 7,
                    height: "45px",
                    fontSize: 15,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Place your order
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderPage;
