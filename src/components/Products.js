// React import
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI import
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//Component import
import SingleProduct from "./SingleProduct";

const Products = (props) => {
  const { ProductData, optValue, minValue, maxValue, color } = props;
  const navigate = useNavigate();

  // console.log("Color:::", color);

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        sx={{ mt: 3, width: "calc(100% + 80px)" }}
      >
        {optValue === "all"
          ? ProductData.filter(
              (item) =>
                item.price >= minValue &&
                item.price <= maxValue &&
                (color === null || item.color.includes(color))
            ).map((item) => (
              <Grid
                item
                key={item}
                xs={12}
                sm={4}
                md={3}
                sx={{
                  maxWidth: { xs: 430, sm: 300 },
                }}
              >
                <Card
                  onClick={() => {
                    navigate(`/product/${item?.id}`);
                  }}
                  sx={{
                    maxwidth: { xs: 450, sm: 800 },
                    height: "300px",
                    border: "1px solid grey",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "contain", height: "190px" }}
                    image={item.image}
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
                      {item.productName}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      {item.productDesc}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      Rs.{item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : ProductData.filter(
              (item) =>
                item.category === optValue &&
                item.price >= minValue &&
                item.price <= maxValue &&
                (color === null || item.color.includes(color))
            ).map((item) => (
              <Grid
                item
                key={item}
                xs={12}
                sm={4}
                md={3}
                sx={{
                  maxWidth: { xs: 430, sm: 300 },
                }}
              >
                <Card
                  sx={{
                    maxwidth: { xs: 450, sm: 800 },
                    height: "300px",
                    border: "1px solid grey",
                  }}
                  onClick={() => {
                    navigate(`/product/${item?.id}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "contain", height: "190px" }}
                    image={item.image}
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
                      {item.productName}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      {item.productDesc}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      Rs.{item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
      <SingleProduct />
    </>
  );
};

export default Products;
