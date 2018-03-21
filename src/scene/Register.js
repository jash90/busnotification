import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Fab,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { Actions } from "react-native-router-flux";
import Moment from "moment";

import Logo from "@components/logo";
import GoogleButton from "@components/google-button";
import FacebookButton from "@components/facebook-button";
import Button from "@components/button";
import Input from "@components/input";
import Head from "@components/head";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Head
          left={true}
          text={"Registration"}
        />
        <Content style={styles.fullStyle}>
          <Logo size={60} />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Firstname"
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Lastname"
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Login"
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Password"
            secureTextEntry={true}
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Repeat Password"
            secureTextEntry={true}
          />
          <Button text="Register"/>
        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  styleHeader: { backgroundColor: "#2196F3" },
  iconHeader: { color: "white", paddingLeft: 5 },
  textHeader: { flex: 3, justifyContent: "center", alignItems: "center" },
  fullStyle: { flex: 1 },
  textInputStyle: {
    borderRadius: 20,
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    alignSelf: "center",
    margin: 10
  },
  buttonRegister: {
    borderRadius: 20,
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    margin: 10,
    alignSelf: "center"
  },
  textRegister: { color: "white", fontSize: 20 }
});
