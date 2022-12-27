import { useState } from "react";
import "./App.css";
import { CustomDialog, Navbar } from "./components";
import { AuthenticationForm, Banner, Query } from "./features";
import { auth as axios } from "./lib";
import useAxios from "./hooks/useAxios";
import { constants } from "./constants";
import { useAuth } from "./hooks/useAuth";
import { Button, Card, CardContent, Typography } from "@mui/material";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const auth = useAuth();

  const { doRequest, errors } = useAxios(axios, {
    url: constants.AUTH.SIGN_IN + `?id=true`,
    method: "post",
  });

  const handleSubmit = (data) => {
    const url =
      data.type === "Sign In" ? constants.AUTH.SIGN_IN : constants.AUTH.SIGN_UP;
    doRequest({
      url: url,
      data: {
        email: data.email,
        password: data.password,
      },
    })
      .then((res) => {
        const { token, user } = res;
        localStorage.setItem("jwt", token);
        auth.login(user);
        handleClose();
      })
      .catch();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const navItems = [
    {
      id: "signin",
      text: "Sign In",
      link: "",
      onClick: () => {
        setDialogOpen(true);
      },
    },
    {
      id: "signout",
      text: "Sign Out",
      link: "",
      onClick: () => {
        localStorage.removeItem("jwt");
        auth.logout();
      },
    },
  ];

  return (
    <>
      <Navbar navItems={navItems} />
      <Banner />
      {auth.user ? (
        <Query total={18} limit={8} />
      ) : (
        <Card sx={{ width: "100%", minHeight: "50vh" }}>
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
                onClick={() => setDialogOpen(true)}
              >
                Sign in to view this page
              </Button>
            </Typography>
          </CardContent>
        </Card>
      )}

      <CustomDialog
        open={dialogOpen}
        handleClose={handleClose}
        content={<AuthenticationForm onSubmit={handleSubmit} />}
        contentType="component"
      />
    </>
  );
}

export default App;
