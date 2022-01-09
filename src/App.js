import "./App.css";
import Navbar from "./components/Navbar";
import Repositories from "./components/Repositories";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Projects from "./components/Projects";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <div className="home-center">
            <Sidebar />
            <Route exact path="/">
              <Overview />
            </Route>

            <Route exact path="/overview">
              <Overview />
            </Route>

            <Route exact path="/repositories">
              <Repositories />
            </Route>

            <Route exact path="/projects">
              <Projects />
            </Route>
          </div>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
