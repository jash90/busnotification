import React, {Component} from "react";
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
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import {Actions} from "react-native-router-flux";
import Moment from "moment";

import Logo from "@components/logo";
import Input from "@components/input";
import Head from "@components/head";
import Button from "@components/button";
import Color from "../Color";
import Language from "../Language";

import Separator from "@components/separator";
import firebase from "react-native-firebase";
import Toast from "react-native-simple-toast";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      repeatPassword: ""
    };
  }

  render() {
    return (
      <Container>
        <Head
          back={true}
          right={true}
          text={Language.get("editProfile")}
          icon={"save"}
          onPress={() => this.changePassword()}/>
        <Content style={styles.fullStyle}>
          <Logo size={100}/>
          <Separator text={Language.get("changePassword")}/>
          <Input
            underlineColorAndroid="transparent"
            placeholder={Language.get("password")}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}/>
          <Input
            underlineColorAndroid="transparent"
            placeholder={Language.get("repeatPassword")}
            secureTextEntry={true}
            value={this.state.repeatPassword}
            onChangeText={text => this.setState({repeatPassword: text})}/>
          <View style={{
            marginTop: 10
          }}>
            <Button text={Language.get("logout")} onPress={() => this.signOutUser()}/>
          </View>
        </Content>
      </Container>
    );
  }

  signOutUser = async() => {
    try {
      await firebase
        .auth()
        .signOut();
      Actions.Login();
    } catch (error) {
      console.log(error);
    }
  };
  changePassword = () => {
    if (this.state.password === "") {
      alert(Language.get("passwordRequired"));
      return;
    }
    if (this.state.repeatPassword === "") {
      alert(Language.get("repeatPassRequired"));
      return;
    }
    if (this.state.password !== this.state.repeatPassword) {
      alert(Language.get("passwordSame"));
      return;
    }
    var user = firebase
      .auth()
      .currentUser;
    user
      .updatePassword(this.state.password)
      .then(() => {
        Toast.show(Language.get("passwordChanged"), Toast.SHORT);
      })
      .catch(error => {
        Toast.show(Language.get("passwordWeak"), Toast.SHORT);
        console.log(error);
      });
  };
}

var styles = StyleSheet.create({
  fullStyle: {
    flex: 1
  }
});
