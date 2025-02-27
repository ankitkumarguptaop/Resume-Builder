import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import style from "./input.module.css";

const Input = ({ lable, width, register, feildName, errors, displayFeild }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", margin: "10px" }}>
        <Typography>{displayFeild} : </Typography>
        <TextField
          className={style.input}
          variant="outlined"
          label={lable}
          {...register(feildName ,  {required: { value: true, message: `${feildName} Required ` }})}
          error={errors[feildName]}
          sx={{
            width: width,
            input: {
              alignContent: "center",
              height: "35px",
              padding: "7px",
              color: "#808080",
              fontWeight: "light",
            },
          }}
        ></TextField>
      </Box>
      <Box >
      {errors[feildName] && (
        <p style={{ color: "red" }}>{errors[feildName].message}</p>
      )}
      </Box>
    </>
  );
};

export default Input;
