import React, { Component } from "react";
import { Router, Stack, Scene, Actions } from "react-native-router-flux";
import Home from "./src/scene/Home";
import Login from "./src/scene/Login";
import Register from "./src/scene/Register";
import Person from "./src/scene/Person";
export default class App extends Component {
  render() {
    return (
      <Router backAndroidHandler={() => Actions.pop()}>
        <Stack key="root">
          <Scene key="Home" component={Home} hideNavBar />
          <Scene key="Login" component={Login} hideNavBar/>
          <Scene key="Register" component={Register} hideNavBar />
          <Scene key="Person" component={Person} hideNavBar initial/>
        </Stack>
      </Router>
    );
  }
}
