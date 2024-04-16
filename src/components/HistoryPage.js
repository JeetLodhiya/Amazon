// React import
import { useNavigate } from "react-router-dom";

// MUI import
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const HistoryPage = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const loggedin = JSON.parse(localStorage.getItem("loggedin"));
  const locLogin = localStorage.getItem("login");

  const checkUser = users?.find(
    (item) => item?.name === loggedin?.name && item?.email === loggedin?.email
  );

  // console.log("User:::", checkUser.order);

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              ml: 3,
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
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ mt: 4, mr: 16 }}>
            History page
          </Typography>
        </Box>
      </Box>
      <Container>
        {!locLogin && (
          <Typography
            variant="h4"
            sx={{ display: "flex", justifyContent: "center", mt: 20 }}
          >
            Please login
          </Typography>
        )}

        {locLogin && !checkUser?.order && (
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              mt: 16,
            }}
          >
            Order is Empty !!!!!!
          </Typography>
        )}
        {locLogin && checkUser?.order?.length == 0 && (
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              mt: 16,
            }}
          >
            Order is Empty !!!!!!
          </Typography>
        )}

        {locLogin &&
          checkUser?.order?.length > 0 &&
          checkUser?.order?.map((orderItem, index) => (
            <>
              <Box
                sx={{
                  ml: 7,
                  mt: 5,
                  height: "auto",
                  width: "auto",
                  border: "1px solid gray",
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    component={"img"}
                    src={orderItem?.image}
                    sx={{
                      objectFit: "contain",
                      height: "170px",
                      width: "150px",
                    }}
                  />
                  <Typography sx={{ mt: 6 }}>
                    {orderItem.productName}
                  </Typography>
                  <Typography sx={{ mt: 6 }}>{orderItem.price}</Typography>
                  <Typography sx={{ mt: 6 }}>{orderItem.dateTime}</Typography>
                </Box>
              </Box>
            </>
          ))}
      </Container>
    </>
  );
};

export default HistoryPage;
