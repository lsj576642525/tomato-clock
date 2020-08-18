import * as React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Index from "./components/Index/Index";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Index}></Route>
        <Route path="/login" component={LogIn}></Route>
        <Route path="/signUp" component={SignUp}></Route>
      </Router>
    );
  }
}

export default App;
