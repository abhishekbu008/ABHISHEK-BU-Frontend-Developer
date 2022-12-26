import "./App.css";
import { Navbar } from "./components";
import { Banner, Query } from "./features";

function App() {
  const navItems = [
    {
      id: "search",
      text: "Explore",
      link: "#search",
    },
    {
      id: "signin",
      text: "Sign In / Sign Up",
      link: "#",
    },
  ];

  return (
    <div className="App">
      <Navbar navItems={navItems} />
      <Banner />
      <Query total={18} limit={8} />
    </div>
  );
}

export default App;
