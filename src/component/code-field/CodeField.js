import { TextField } from "@mui/material";
import React from "react";
import "./CodeField.css";

export default function CodeField(props) {
  const text = props.text || "";
  const label = props.label || "";
  const readOnly = props.readOnly || false;
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      value={text}
      label={label}
      rows={16}
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
