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
  ];

  return (
    <div className="App">
      <Navbar navItems={navItems} />
      <Banner />
      <Query />
    </div>
  );
}

export default App;
