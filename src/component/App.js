import "./App.css";
import React, { useState } from "react";
import { Box, Stack } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Header from "./header/Header";
import CodeField from "./code-field/CodeField";
import AndroidUiHierarchyFormatter from "../util/AndroidUiHierarchyFormatter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Button,
  Snackbar,
  ThemeProvider,
  ToggleButton,
  Typography,
} from "@mui/material";
import JsonUtil from "../util/JsonUtil";
import ReactJson from "react-json-view";
import FieldFilter from "./field-filter/FieldFilter";

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

const exampleInput = `
+>DecorView{id=-1, visibility=VISIBLE, width=1080, height=2280, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params={(0,0)(fillxfill) gr=CENTER sim={adjust=resize} ty=APPLICATION fmt=TRANSPARENT wanim=0x7f140009 fl=DIM_BEHIND LAYOUT_IN_SCREEN LAYOUT_INSET_DECOR SPLIT_TOUCH HARDWARE_ACCELERATED DRAWS_SYSTEM_BAR_BACKGROUNDS pfl=NO_MOVE_ANIMATION FORCE_DRAW_STATUS_BAR_BACKGROUND FIT_INSETS_CONTROLLED bhv=DEFAULT fitSides=}, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=2}
|
+->LinearLayout{id=-1, visibility=VISIBLE, width=1080, height=2214, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=2}
|
+-->ViewStub{id=16908741, res-name=action_mode_bar_stub, visibility=GONE, width=0, height=0, has-focus=false, has-focusable=false, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=true, is-selected=false, layout-params=android.widget.LinearLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0}
|
+-->FrameLayout{id=-1, visibility=VISIBLE, width=1080, height=2214, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.LinearLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=1}
|
+--->FitWindowsFrameLayout{id=2131361873, res-name=action_bar_root, visibility=VISIBLE, width=1080, height=2214, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=2}
|
+---->ContentFrameLayout{id=16908290, res-name=content, visibility=VISIBLE, width=1080, height=2214, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=1}
|
+----->FrameLayout{id=2131362503, res-name=container, visibility=VISIBLE, width=1080, height=2214, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=1}
|
+------>CoordinatorLayout{id=2131362528, res-name=coordinator, visibility=VISIBLE, width=1080, height=2131, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=83.0, child-count=2}
|
+------->View{id=2131365415, res-name=touch_outside, visibility=VISIBLE, width=1080, height=2131, has-focus=false, has-focusable=false, has-window-focus=true, is-clickable=true, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=androidx.coordinatorlayout.widget.CoordinatorLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0}
|
+------->FrameLayout{id=2131362622, res-name=design_bottom_sheet, visibility=VISIBLE, width=1080, height=1451, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=androidx.coordinatorlayout.widget.CoordinatorLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=680.0, child-count=1}
|
+-------->FrameLayout{id=-1, visibility=VISIBLE, width=1080, height=1451, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=1}
|
+--------->LinearLayout{id=-1, visibility=VISIBLE, width=1080, height=1319, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.FrameLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=132.0, child-count=4}
|
+---------->LinearLayout{id=-1, visibility=VISIBLE, width=1080, height=160, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.LinearLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=0.0, y=0.0, child-count=2}
|
+----------->LinearLayout{id=-1, visibility=VISIBLE, width=992, height=71, has-focus=false, has-focusable=true, has-window-focus=true, is-clickable=false, is-enabled=true, is-focused=false, is-focusable=false, is-layout-requested=false, is-selected=false, layout-params=android.widget.LinearLayout$LayoutParams@YYYYYY, tag=null, root-is-layout-requested=false, has-input-connection=false, x=44.0, y=44.0, child-count=2}
`;

export default function App() {
  const [inputCode, setInputCode] = useState("");
  const [originalResult, setOriginalResult] = useState([]);
  const [outputCode, setOutputCode] = useState("[]");
  const [invalidInputCode, setInvalidInputCode] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [allFields, setAllFields] = useState([]);
  const [excludedFields, setExcludedFields] = useState([]);
  const [collapsedAllField, setCollapsedAllField] = useState(false);

  function handleTextChanged(input) {
    setInputCode(input);
    try {
      let result = AndroidUiHierarchyFormatter.format(input);
      setOriginalResult(result);
      showOutputCode(result, excludedFields);
      setInvalidInputCode(false);
    } catch (error) {
      setOutputCode("[]");
      setInvalidInputCode(true);
      setAllFields([]);
      setExcludedFields([]);
    }
  }

  function handleCopyClicked() {
    setShowCopiedMessage(true);
  }

  function handleCopiedMessageClosed(reason) {
    if (reason === "clickaway") return;
    setShowCopiedMessage(false);
  }

  function handleToggleFieldClick(field) {
    let updatedExcludedFields;
    if (excludedFields.includes(field)) {
      JsonUtil.removeValueFromArray(excludedFields, field);
      updatedExcludedFields = excludedFields;
      setExcludedFields(updatedExcludedFields ? updatedExcludedFields : []);
    } else {
      updatedExcludedFields = [...excludedFields, field];
      setExcludedFields(updatedExcludedFields);
    }
    showOutputCode(originalResult, updatedExcludedFields);
  }

  function showOutputCode(result, excludedFields) {
    setAllFields(JsonUtil.getAllAttributeField(result));
    const cloneResult = JSON.parse(JSON.stringify(result));
    const actualResult = JsonUtil.removeExcludedField(
      cloneResult,
      excludedFields
    );
    setOutputCode(JSON.stringify(actualResult, null, 2));
  }

  function handleIncludeAllFields() {
    setExcludedFields([]);
    showOutputCode(originalResult, []);
  }

  function handleExcludeAllFields() {
    const excludedFields = JSON.parse(JSON.stringify(allFields));
    setExcludedFields(excludedFields);
    showOutputCode(originalResult, excludedFields);
  }

  function handleExpandAllFields() {
    setCollapsedAllField(false);
  }

  function handleCollapseAllFields() {
    setCollapsedAllField(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Stack direction="column">
          <Header />
          <Box mt={8} ml={8} mr={8}>
            <CodeField
              sx={{ width: "1000" }}
              label="Input"
              text={inputCode}
              readOnly={false}
              invalid={invalidInputCode}
              onTextChanged={(text) => {
                handleTextChanged(text);
              }}
            />
          </Box>
          <Stack
            mt={4}
            ml={8}
            mr={8}
            spacing={4}
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Button
              sx={{ maxWidth: 300 }}
              variant="contained"
              onClick={() => {
                handleTextChanged(exampleInput);
              }}
            >
              Show an example
            </Button>

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
          <Stack
            mt={4}
            ml={8}
            mr={8}
            direction="row"
            display={allFields.length == 0 ? "none" : "flex"}
            sx={{ flexWrap: "wrap" }}
          >
            <Box mt={1} mr={1}>
              <ToggleButton
                color="success"
                value="Include All Fields"
                selected={true}
                style={{ textTransform: "none" }}
                onChange={() => {
                  handleIncludeAllFields();
                }}
              >
                Include All Fields
              </ToggleButton>
            </Box>

            <Box mt={1} mr={1}>
              <ToggleButton
                color="error"
                value="Exclude All Fields"
                selected={true}
                style={{ textTransform: "none" }}
                onChange={() => {
                  handleExcludeAllFields();
                }}
              >
                Exclude All Fields
              </ToggleButton>
            </Box>

            <Box mt={1} mr={1} ml={4}>
              <ToggleButton
                color="standard"
                value="Expand All Fields"
                selected={true}
                style={{ textTransform: "none" }}
                onChange={() => {
                  handleExpandAllFields();
                }}
              >
                Expand All Fields
              </ToggleButton>
            </Box>

            <Box mt={1} mr={1}>
              <ToggleButton
                color="standard"
                value="Collapse All Fields"
                selected={true}
                style={{ textTransform: "none" }}
                onChange={() => {
                  handleCollapseAllFields();
                }}
              >
                Collapse All Fields
              </ToggleButton>
            </Box>
          </Stack>
          <FieldFilter
            allFields={allFields}
            excludedFields={excludedFields}
            onToggleFieldChanged={(values) => {
              handleToggleFieldClick(values);
            }}
          />
          <Box className="OutputContainer" mt={4} ml={8} mr={8} mb={8}>
            <Typography className="OutputContainerLabel" variant="body1">
              Output
            </Typography>
            <Box className="JsonOutput">
              <ReactJson
                src={JSON.parse(outputCode)}
                iconStyle="square"
                indentWidth={2}
                collapsed={collapsedAllField}
                enableClipboard={false}
                displayDataTypes={false}
              />
            </Box>
          </Box>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={showCopiedMessage}
            autoHideDuration={3000}
            message="Copied"
            onClose={(_, reason) => {
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
