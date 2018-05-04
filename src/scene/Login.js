import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid,
  AsyncStorage
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
import Language from "../Language";

import firebase from "react-native-firebase";
import Toast from "react-native-simple-toast";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount = () => {
    // Language.setL("pl");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Toast.show(Language.get("loginAs") + user.email + ".", Toast.SHORT);
        Actions.Home({ userId: user.uid });
      }
    });
  };

  async componentDidMount() {
    this.setState({ email: this.props.email, password: this.props.password });
    try {
      const email = await AsyncStorage.getItem("@login:key");
      if (email !== null) {
        this.setState({ email });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Container>
        <Head
          right={true}
          icon={"person-add"}
          text={Language.get("sign")}
          onPress={() => Actions.Register()}
        />
        <View style={styles.fullStyle}>
          <View>
            <Logo size={150} />
            <Input
              placeholder={Language.get("email")}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
            <Input
              placeholder={Language.get("password")}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </View>
          <Content contentContainerStyle={styles.buttonContener}>
            <Button text={Language.get("login")} onPress={() => this.login()} />
            <FacebookButton text={Language.get("signFace")} />
            <GoogleButton text={Language.get("signGoogle")} />
          </Content>
        </View>
      </Container>
    );
  }
  async saveloginhaslo(login, password) {
    try {
      await AsyncStorage.setItem("@login:key", login);
      await AsyncStorage.setItem("@password:key", password);
    } catch (error) {
      console.log(error);
    }
  }

  login() {
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(
        this.state.email,
        this.state.password
      )
      .then(data => {
        Toast.show(
          Language.get("loginAs") + data.user.email + ".",
          Toast.SHORT
        );
        this.saveloginhaslo(this.state.email, this.state.password);
        Actions.Home({ userId: data.user.uid });
      })
      .catch(error => {
        if (error.code === "auth/wrong-password") {
          Toast.show(Language.get("passwordIncorrect"), Toast.SHORT);
        }
        if (error.code === "auth/user-not-found") {
          Toast.show(Language.get("userNotFound"), Toast.SHORT);
        }
        if (error.code === "auth/invalid-email") {
          Toast.show(Language.get("passwordIncorrect"), Toast.SHORT);
        }
        if (error.code === "auth/user-disabled") {
          Toast.show(Language.get("userNotFound"), Toast.SHORT);
        }
        console.log(error);
      });
  }
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1
  },
  buttonContener: {
    width: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
