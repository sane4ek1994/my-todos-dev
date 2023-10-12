import TextField from "@mui/material/TextField";
import React from "react";
import s from "./captcha.module.css";

type Props = {
  captcha: string | null;
  formik: any;
};
export const Captcha = ({ captcha, formik }: Props) => {
  return (
    <div className={s.captchaContainer}>
      <img src={captcha ? captcha : ""} alt="captha" />
      <TextField
        variant="standard"
        type="text"
        label="Captcha"
        margin="normal"
        {...formik.getFieldProps("captcha")}
      />
    </div>
  );
};
