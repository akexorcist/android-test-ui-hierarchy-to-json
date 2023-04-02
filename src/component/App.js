import "./App.css";
import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Header from "./header/Header";
import CodeField from "./code-field/CodeField";
import AndroidUiHierarchyFormatter from "../formatter/AndroidUiHierarchyFormatter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Snackbar, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

export default function App() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState(inputCode);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  function handleTextChanged(text) {
    let result = AndroidUiHierarchyFormatter.format(text);
    setInputCode(text);
    setOutputCode(result);
  }

  function handleCopyClicked() {
    console.log("handleCopyClicked");
    setShowCopiedMessage(true);
  }

  function handleCopiedMessageClosed(reason) {
    if (reason === "clickaway") return;
    setShowCopiedMessage(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <Stack direction="column">
          <Header />
          <Stack
            mt={8}
            ml={8}
            mr={8}
            spacing={8}
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Box sx={{ flexGrow: 1, minWidth: 100, maxWidth: 600 }}>
              <CodeField
                sx={{ width: "1000" }}
                label="Input"
                text={inputCode}
                readOnly={false}
                onTextChanged={(text) => {
                  handleTextChanged(text);
                }}
              />
            </Box>
            <Stack
              sx={{ flexGrow: 1, minWidth: 100, maxWidth: 600 }}
              spacing={4}
              alignItems="center"
              direction="column"
            >
              <CodeField label="Output" text={outputCode} readOnly={true} />
              <CopyToClipboard text={outputCode}>
                <Button
                  sx={{ maxWidth: 300 }}
                  variant="contained"
                  onClick={() => {
                    handleCopyClicked();
                  }}
                >
                  Copy output to clipboard
                </Button>
              </CopyToClipboard>
            </Stack>
          </Stack>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={showCopiedMessage}
            autoHideDuration={3000}
            message="Copied"
            onClose={(event, reason) => {
              handleCopiedMessageClosed(reason);
            }}
            action={
              <Button
                variant="text"
                onClick={() => {
                  handleCopiedMessageClosed();
                }}
              >
                Close
              </Button>
            }
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
