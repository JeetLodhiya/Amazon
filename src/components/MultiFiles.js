// React import
import React from "react";
import { useState } from "react";

// MUI import
import { Grid } from "@mui/material";

//Component import
import { data } from "../data/data";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Navbar from "./Navbar";

const MultiFiles = () => {
  // State
  const [ProductData, setProductData] = useState(data);
  const [optValue, setOptValue] = useState("all");
  const [color, setColor] = useState(null);
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(2100);

  return (
    <>
      <Navbar
        ProductData={ProductData}
        setProductData={setProductData}
        data={data}
      />
      <Grid container sx={{ gap: 3, mt: 6 }}>
        <Grid item xs={12} sm={3} md={3}>
          <Filter
            optValue={optValue}
            setOptValue={setOptValue}
            ProductData={ProductData}
            minValue={minValue}
            setminValue={setminValue}
            maxValue={maxValue}
            setmaxValue={setmaxValue}
            color={color}
            setColor={setColor}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Products
            ProductData={ProductData}
            optValue={optValue}
            minValue={minValue}
            setminValue={setminValue}
            maxValue={maxValue}
            setmaxValue={setmaxValue}
            color={color}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MultiFiles;
