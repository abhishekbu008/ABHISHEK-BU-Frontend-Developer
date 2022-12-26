import { useState } from "react";
import "./App.css";
import { CustomDialog, Navbar } from "./components";
import { AuthenticationForm, Banner, Query } from "./features";

function App() {
  const [loginData, setLoginData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log(data);
    setLoginData(data);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const navItems = [
    {
      id: "search",
      text: "Explore",
      link: "#search",
      onClick: () => {},
    },
    {
      id: "signin",
      text: "Sign In / Sign Up",
      link: "#",
      onClick: () => {
        setDialogOpen(true);
      },
    },
  ];

  return (
    <div className="App">
      <Navbar navItems={navItems} />
      <Banner />
      <Query total={18} limit={8} />
      <CustomDialog
        open={dialogOpen}
        handleClose={handleClose}
        content={<AuthenticationForm onSubmit={handleSubmit} />}
        contentType="component"
      />
    </div>
  );
}

export default App;
