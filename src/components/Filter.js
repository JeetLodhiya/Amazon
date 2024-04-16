// React import
import { useState } from "react";

// MUI import
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const Filter = (props) => {
  //State
  const [value, setValue] = useState([0, 2100]);

  const {
    optValue,
    setOptValue,
    ProductData,
    setminValue,
    setmaxValue,
    color,
    setColor,
  } = props;

  const handleOptChange = (event) => {
    setOptValue(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setminValue(newValue[0]);
    setmaxValue(newValue[1]);
  };
  return (
    <>
      <Box
        sx={{
          mt: 5,
          height: "auto",
          border: "1px solid gray",
          minWidth: 188,
          top: 20,
        }}
      >
        <Paper
          sx={{ height: 493, width: "auto", padding: "32px", pt: 1 }}
          elevation={4}
        >
          <Typography variant="h5">Category</Typography>
          <RadioGroup
            value={optValue}
            onChange={handleOptChange}
            defaultValue={ProductData}
            column
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              control={<Radio color="secondary" />}
              label={
                <Typography variant="body1" color="black">
                  All
                </Typography>
              }
              value="all"
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              label={
                <Typography variant="body1" color="black">
                  Men's
                </Typography>
              }
              value="men"
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              label={
                <Typography variant="body1" color="black">
                  Women's
                </Typography>
              }
              value="women"
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              label={
                <Typography variant="body1" color="black">
                  Men's Footwear
                </Typography>
              }
              value="menfootwear"
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              label={
                <Typography variant="body1" color="black">
                  Women's Footwear
                </Typography>
              }
              value="womenfootwear"
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              label={
                <Typography variant="body1" color="black">
                  Boy Kid's
                </Typography>
              }
              value="boy"
            />
          </RadioGroup>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h5">Price</Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="on"
              step={50}
              min={0}
              max={2100}
            />
          </Box>
          <Box>
            <Typography sx={{ ml: 2, mt: 1 }} variant="h5">
              Color :-
            </Typography>
            <RadioGroup
              value={color}
              onChange={handleColorChange}
              row
              sx={{ mt: 2, display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  label={
                    <Typography variant="body1" color="black">
                      Red
                    </Typography>
                  }
                  value="Red"
                />
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  label={
                    <Typography variant="body1" color="black">
                      Purple
                    </Typography>
                  }
                  value="Purple"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  label={
                    <Typography variant="body1" color="black">
                      Blue
                    </Typography>
                  }
                  value="Blue"
                />
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  label={
                    <Typography variant="body1" color="black">
                      Green
                    </Typography>
                  }
                  value="Green"
                />
              </Box>
            </RadioGroup>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Filter;
