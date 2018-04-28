import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ToastAndroid,
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
import Color from "../Color";

import firebase from "react-native-firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatpassword: ""
    };
  }

  render() {
    return (
      <Container>
        <Head back={true} text={"Registration"} />
        <Content style={styles.fullStyle}>
          <Logo size={60} />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Email"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder="Repeat Password"
            secureTextEntry={true}
            value={this.state.repeatpassword}
            onChangeText={text => this.setState({ repeatpassword: text })}
          />
          <View style={{ marginTop: 10 }}>
            <Button
              text="Register"
              onPress={() =>
                this.register()
              }
            />
          </View>
        </Content>
      </Container>
    );
  }
  register() {
    if (this.state.email === "") {
      alert("Podaj Email");
      return;
    }
    if (this.state.password === "") {
      alert("Podaj Hasło");
      return;
    }
    if (this.state.repeatpassword === "") {
      alert("Powtórz Hasło");
      return;
    }
    if (!this.state.password === this.state.repeatpassword) {
      alert("Hasła muszą być takie same");
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      alert("Email jest niepoprawny.");
      return;
    }
    this.setState({ loading: true });
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(() => {
        ToastAndroid.show(
          "Konto " + this.state.email + " zostało utworzone.",
          ToastAndroid.SHORT
        );
        Actions.Login({
          email: this.state.email,
          password: this.state.password
        });
      })
      .catch(error => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  }
}

var styles = StyleSheet.create({
  fullStyle: { flex: 1 }
});
