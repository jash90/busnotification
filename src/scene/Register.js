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
          back={true}
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
  fullStyle: { flex: 1 },
});
