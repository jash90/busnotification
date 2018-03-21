import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
  }

  render() {
    return (
      <Container>
        <Head
          back={true}
          right={true}
          icon={"person-add"}
          text={"Sign in"}
          onPress={()=>Actions.Register()}
        />
        <View style={styles.fullStyle}>
          <View>
            <Logo size={150} />
            <Input
              placeholder={"Login"}
              onChangeText={text => this.setState({ login: text })}
              value={this.state.login}
            />
            <Input
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
          <Content contentContainerStyle={styles.buttonContener}>
            <Button text="Login" />
            <FacebookButton text="Sign in Facebook" />
            <GoogleButton text="Sign in Google" />
          </Content>
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  fullStyle: { flex: 1 },
  buttonContener: {
    width: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
