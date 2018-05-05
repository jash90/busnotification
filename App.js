import React, { Component } from "react";
import { Router, Stack, Scene, Actions } from "react-native-router-flux";
import Home from "./src/scene/Home";
import Login from "./src/scene/Login";
import Register from "./src/scene/Register";
import Person from "./src/scene/Person";
import Edit from "./src/scene/Edit";
import Language from "./src/Language";
import DeviceInfo from 'react-native-device-info';
export default class App extends Component {
  componentWillMount() {
    Language.setL(DeviceInfo.getDeviceLocale().substring(0,2));
  }
  render() {
    return (
      <Router backAndroidHandler={() => Actions.pop()}>
        <Stack key="root">
          <Scene key="Home" component={Home} hideNavBar />
          <Scene key="Login" component={Login} hideNavBar initial />
          <Scene key="Register" component={Register} hideNavBar />
          <Scene key="Person" component={Person} hideNavBar />
          <Scene key="Edit" component={Edit} hideNavBar />
        </Stack>
      </Router>
    );
  }
}
