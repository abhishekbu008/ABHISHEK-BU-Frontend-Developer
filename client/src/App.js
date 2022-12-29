import "./App.css";
import { Navbar, Dropdown } from "./components";
import { AuthenticationForm, Banner, Query } from "./features";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authDialogClose, authDialogOpen } from "./appSlice";
import { signout } from "./features/Authentication/authenticationSlice";
import ModalDialog from "./components/ModalDialog/ModalDialog";

function App() {
  const auth = useSelector((state) => state.auth);
  const authDialogState = useSelector((state) => state.app.authDialog);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    dispatch(authDialogClose());
  };

  const navItems = [];

  if (auth.user) {
    navItems.push({
      id: "signout",
      text: "Sign Out",
      link: "",
      onClick: () => {
        dispatch(signout());
      },
    });
  } else {
    navItems.push({
      id: "signin",
      text: "Sign In",
      link: "",
      onClick: () => {
        dispatch(authDialogOpen());
      },
    });
  }

  return (
    <>
      <Navbar navItems={navItems} />
      <Banner />
      {auth.user ? (
        <Query total={18} limit={8} />
      ) : (
        <Card>
          <CardContent
            sx={{
              display: "block",
              marginTop: "25vh",
              transform: "translateY(-50%)",
            }}
          >
            <Typography textAlign={"center"}>
              <Button
                sx={{ height: "5rem" }}
                variant="contained"
                onClick={() => dispatch(authDialogOpen())}
              >
                Sign in to view capsules
              </Button>
            </Typography>
          </CardContent>
        </Card>
      )}

      <ModalDialog
        open={authDialogState}
        content={<AuthenticationForm />}
        onClose={handleDialogClose}
        id="auth"
      />
      <Dropdown />
    </>
  );
}

export default App;
