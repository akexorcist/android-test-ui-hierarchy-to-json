import { TextField } from "@mui/material";
import React from "react";
import "./CodeField.css";

export default function CodeField(props) {
  const text = props.text || "";
  const label = props.label || "";
  const readOnly = props.readOnly || false;
  const invalid = props.invalid || false;
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      value={text}
      label={label}
      minRows={4}
      maxRows={12}
      error={invalid}
      helperText={invalid ? "Invalid code" : ""}
      InputProps={{
        readOnly: readOnly,
      }}
      multiline
      fullWidth
      onChange={(event) => {
        props.onTextChanged?.(event.target.value);
      }}
    />
  );
}
