import { Outlet, NavLink } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { CatchingPokemon } from "@mui/icons-material";

export const Layout = () => {
  const user = localStorage.getItem("userEmail")
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CatchingPokemon />
          </IconButton>
          <Stack direction="row" spacing={2} flexGrow={1}>
            <Typography
              color="white"
              noWrap
              variant="h6"
              component={NavLink}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              ChatApp
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            {
              !user ?    <>
              <Button
                component={NavLink}
                to="/signin"
                variant="outlined"
                color="inherit"
              >
                Sign In
              </Button>
              <Button
                component={NavLink}
                to="/signup"
                variant="outlined"
                color="inherit"
              >
                Sign Up
              </Button>

            </>:
                <Button
                variant="outlined"
                color="inherit"
                onClick={()=>{localStorage.clear();window.location.reload()}}
              >
                Sign Up
              </Button>
            }
          
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
