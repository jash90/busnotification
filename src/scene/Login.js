import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid
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
import firebase from "react-native-firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "bartek@gg.pl",
      password: "123456"
    };
  }

  render() {
    return (
      <Container>
        <Head
          right={true}
          icon={"person-add"}
          text={"Sign in"}
          onPress={() => Actions.Register()}
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
            <Button text="Login" onPress={() => this.login()} />
            <FacebookButton text="Sign in Facebook" />
            <GoogleButton text="Sign in Google" />
          </Content>
        </View>
      </Container>
    );
  }
  login() {
    //   this.setState({ loading: true });
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(
        this.state.login,
        this.state.password
      )
      .then(data => {
        ToastAndroid.show(
          "Zalogowałes sie jako " + data.user.email + ".",
          ToastAndroid.SHORT
        );
      })
      .catch(error => {
        // this.setState({
        //   error: "Authentication failed.",
        //   loading: false
        // });
        if (error.code === "auth/wrong-password") {
          ToastAndroid.show("The password is invalid.", ToastAndroid.SHORT);
        }
        if (error.code === "auth/user-not-found") {
          ToastAndroid.show("The user is not found.", ToastAndroid.SHORT);
        }
        if (error.code === "auth/invalid-email") {
          ToastAndroid.show(
            "The email address is badly formatted.",
            ToastAndroid.SHORT
          );
        }
        if (error.code === "auth/user-disabled") {
          ToastAndroid.show("The user is disabled.", ToastAndroid.SHORT);
        }

        console.log(error);
        //    ToastAndroid.show(error, ToastAndroid.SHORT);
      });
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
