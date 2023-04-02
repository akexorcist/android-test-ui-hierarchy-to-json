import { AppBar, Toolbar, Typography } from "@mui/material";
import "./Header.css";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" noWrap>
          Android UI Hierarchy to JSON
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
