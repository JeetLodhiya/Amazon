// React import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// MUI import
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Component import
import { data } from "../data/data";

const SingleProduct = () => {
  // State
  const [singleproduct, setSingleproduct] = useState(null);

  const locLogin = localStorage.getItem("login");
  const users = JSON.parse(localStorage.getItem("users"));
  const loggedin = JSON.parse(localStorage.getItem("loggedin"));

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const single = data?.filter((item) => item.id == id);
      setSingleproduct(single[0]);
    }
  }, [id]);

  const handleAdd = (singleproduct) => {
    if (locLogin) {
      // console.log("users", users);
      // console.log("loggedin", loggedin?.name);

      const checkUser = users?.find(
        (item) =>
          item?.name === loggedin?.name && item?.email === loggedin?.email
      );

      if (checkUser) {
        const userIndex = users?.findIndex(
          (item) =>
            item?.name === loggedin?.name && item?.email === loggedin?.email
        );

        if (!users[userIndex].cart) {
          users[userIndex].cart = [];
        }

        // Push the singleproduct into the cart array
        users[userIndex].cart.push(singleproduct);
        // console.log("users", users);

        localStorage.setItem("users", JSON.stringify(users));
      }
    } else {
      navigate("/login");
    }
  };

  const handleBuyNow = () => {
    locLogin
      ? navigate("/orderpage", { state: singleproduct })
      : navigate("/login");
  };

  // console.log("singleproduct", singleproduct);

  return (
    <>
      {singleproduct !== null && (
        <>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="primary"
            sx={{
              width: 120,
              borderRadius: 6,
              height: "48px",
              display: "flex",
              mt: 3,
              ml: 3,
            }}
          >
            Back
          </Button>
          <Box
            sx={{
              ml: 10,
              height: 30,
              display: "flex",
              justifyContent: "left",
            }}
          ></Box>
          <Container
            sx={{
              height: 500,
              border: "1px solid gray",
            }}
          >
            <Grid container sx={{ gap: 1, marginLeft: 10 }}>
              <Grid item xs={12} sm={3} md={4}>
                <Box
                  sx={{
                    maxheight: "375px",
                    maxwidth: "370px",
                    border: "1px solid lightgray",
                    mt: 5,
                  }}
                >
                  <Card sx={{ maxheight: "350px", mt: 3 }}>
                    <CardMedia
                      component="img"
                      sx={{ objectFit: "contain", height: "320px" }}
                      image={singleproduct.image}
                    />
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} md={4} sx={{ mt: 5 }}>
                <Box
                  sx={{
                    height: "50px",
                    width: 600,
                  }}
                >
                  <Typography variant="h4" sx={{ textAlign: "left" }}>
                    {singleproduct.productName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "auto",
                    width: 440,
                    mt: 2,
                    textAlign: "left",
                  }}
                >
                  {singleproduct.productDesc}
                </Box>
                <Box
                  sx={{
                    height: "50px",
                    width: 250,
                    mt: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ textAlign: "left" }}>
                    Rs.{singleproduct.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "50px",
                    width: 600,
                    mt: 2,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    onClick={() => handleAdd(singleproduct)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#ffd814 !important",
                      width: 200,
                      color: "black",
                      borderRadius: 7,
                      height: "48px",
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="contained"
                    sx={{
                      backgroundColor: "#ffa41c !important",
                      width: 200,
                      color: "black",
                      borderRadius: 7,
                      height: "48px",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default SingleProduct;
