// React import
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// MUI import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "22ch",
      },
    },
  },
}));
const Navbar = (props) => {
  // State
  const { setProductData, data } = props;

  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("users"));
  const locLogin = localStorage.getItem("login");
  const logName = JSON.parse(localStorage.getItem("loggedin"));

  const checkUser = users.find(
    (item) => item?.name === logName?.name && item?.email === logName?.email
  );

  // console.log("checkUser:::", checkUser?.cart);

  const handleLogOut = () => {
    localStorage.removeItem("login");
    navigate("/");
  };

  const handleSignIn = () => {
    if (localStorage.getItem("login")) {
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value === "") {
      setProductData(data);
    } else {
      const result = data.filter((item) =>
        item?.productName
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setProductData(result);
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: "white", textDecoration: "none" }}
            >
              Amazon
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleInputChange}
              />
            </Search>
            {locLogin ? (
              <>
                <Typography
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    position: "relative",
                    top: 6,
                  }}
                >
                  {logName.name}
                </Typography>
                <Typography
                  onClick={handleLogOut}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    position: "relative",
                    top: 6,
                    cursor: "pointer",
                  }}
                >
                  Sign out
                </Typography>
              </>
            ) : (
              <Typography
                onClick={handleSignIn}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  position: "relative",
                  top: 6,
                  cursor: "pointer",
                }}
              >
                Sign In
              </Typography>
            )}
            <Typography
              onClick={() => navigate("/history")}
              sx={{
                color: "white",
                textDecoration: "none",
                position: "relative",
                top: 6,
                cursor: "pointer",
              }}
            >
              History
            </Typography>
            <Link to="/cart">
              <ShoppingCartOutlinedIcon sx={{ color: "white", mt: 1 }} />
            </Link>
            <Typography
              sx={{
                position: "relative",
                bottom: 5,
                right: 20,
              }}
            >
              {locLogin && checkUser?.cart?.length
                ? checkUser?.cart?.length
                : 0}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
