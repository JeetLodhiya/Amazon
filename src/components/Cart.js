import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const locLogin = localStorage.getItem("login");
  const loggedin = JSON.parse(localStorage.getItem("loggedin"));

  // Function to fetch user and cart data
  const fetchUserData = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUser = users?.find(
      (item) => item.name === loggedin.name && item.email === loggedin.email
    );
    setUser(currentUser);
    setCart(currentUser?.cart || []);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRemove = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem !== item);
    const updatedUser = { ...user, cart: updatedCart };
    const updatedUsers = JSON.parse(localStorage.getItem("users")).map((u) =>
      u.name === loggedin.name && u.email === loggedin.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(updatedUser);
    setCart(updatedCart);
  };

  const handleAllClick = () => {
    navigate("/orderpage", { state: cart });
  };

  const handleClick = (item) => {
    navigate("/orderpage", { state: item });
  };

  return (
    <>
      <Box
        sx={{
          mt: 3,
          height: 30,
          display: "flex",
          justifyContent: "space-between",
          px: 2,
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
        {locLogin && cart.length === 0 && (
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              mt: 16,
            }}
          >
            Cart is Empty !!!!!!
          </Typography>
        )}
        {locLogin && cart.length > 0 && (
          <Button
            onClick={handleAllClick}
            variant="contained"
            sx={{
              backgroundColor: "#ffa41c !important",
              height: "48px",
              width: 120,
              color: "white",
              borderRadius: 7,
            }}
          >
            Buy All
          </Button>
        )}
      </Box>
      <Container
        sx={{
          mt: 5,
          height: "100%",
        }}
      >
        {!locLogin && (
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              mt: 10,
            }}
          >
            Please login
          </Typography>
        )}
        <Grid container sx={{ gap: 3 }}>
          {cart.map((item, index) => (
            <Grid
              key={index}
              xs={12}
              sm={4}
              md={1}
              sx={{
                maxWidth: { xs: 430, sm: 300 },
                mt: 10,
              }}
            >
              <Card
                sx={{
                  maxwidth: { xs: 450, sm: 800 },
                  height: "300px",
                  border: "1px solid grey",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ objectFit: "contain", height: "190px" }}
                  image={item?.image}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item?.productName}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{ fontSize: "18px", fontWeight: 600 }}
                  >
                    {item?.productDesc}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{ fontSize: "18px", fontWeight: 600 }}
                  >
                    Rs.{item?.price}
                  </Typography>
                </CardContent>
              </Card>
              <Stack sx={{ width: 175, height: 70, mt: 1 }}>
                <Button
                  onClick={() => handleRemove(item)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#673ab7 !important",
                    width: 175,
                    color: "white",
                    borderRadius: 7,
                    height: "30px",
                  }}
                >
                  Remove
                </Button>
                <Button
                  onClick={() => handleClick(item)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffa41c !important",
                    width: 175,
                    color: "white",
                    borderRadius: 7,
                    height: "30px",
                    mt: 1,
                  }}
                >
                  Buy Now
                </Button>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
