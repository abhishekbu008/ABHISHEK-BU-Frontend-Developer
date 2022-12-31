import "./App.css";
import { Error, Navbar } from "./components";
import { AuthenticationForm, Banner, Query } from "./features";
import { useDispatch, useSelector } from "react-redux";
import { authDialogClose, authDialogOpen, clearError } from "./appSlice";
import { signout } from "./features/Authentication/authenticationSlice";
import ModalDialog from "./components/ModalDialog/ModalDialog";
import { constants } from "./constants";

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
    <Error>
      <Navbar navItems={navItems} />
      <Banner />
      {auth.user ? (
        <Query
          feature="CAPSULES"
          searchableOptions={constants.CAPSULE_OPTIONS}
        />
      ) : null}

      <ModalDialog
        open={authDialogState}
        content={<AuthenticationForm />}
        onClose={handleDialogClose}
        id="auth"
      />
    </Error>
  );
}

export default App;
