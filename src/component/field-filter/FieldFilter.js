import { Box, Stack, ToggleButton } from "@mui/material";

export default function FieldFilter(props) {
  const allFields = props.allFields || [];
  const excludedFields = props.excludedFields || [];

  return (
    <Stack
      mt={2}
      ml={8}
      mr={8}
      mb={2}
      direction="row"
      display={allFields.length == 0 ? "none" : "flex"}
      sx={{ flexWrap: "wrap" }}
    >
      {allFields.map((field) => {
        return (
          <Box mt={1} mr={1} key={field}>
            <ToggleButton
              color="primary"
              value={field}
              selected={!excludedFields.includes(field)}
              style={{ textTransform: "none" }}
              onChange={(event) => {
                props.onToggleFieldChanged(event.target.value);
              }}
            >
              {field}
            </ToggleButton>
          </Box>
        );
      })}
    </Stack>
  );
}
