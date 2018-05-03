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
import Input from "@components/input";
import Head from "@components/head";
import Button from "@components/button";
import Color from "../Color";
import Language from "../Lang";

import Separator from "@components/separator";
import firebase from "react-native-firebase";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Head
          back={true}
          right={true}
          text={Language.get("editProfile")}
          icon={"save"}
        />
        <Content style={styles.fullStyle}>
          <Logo size={100} />
          <Separator text={Language.get("changePassword")} />
          <Input
            underlineColorAndroid="transparent"
            placeholder={Language.get("password")}
            secureTextEntry={true}
          />
          <Input
            underlineColorAndroid="transparent"
            placeholder={Language.get("repeatPassword")}
            secureTextEntry={true}
          />
          <View style={{ marginTop: 10 }}>
            <Button
              text={Language.get("logout")}
              onPress={() => this.signOutUser()}
            />
          </View>
        </Content>
      </Container>
    );
  }

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      Actions.Login();
    } catch (e) {
      console.log(e);
    }
  };
}

var styles = StyleSheet.create({
  fullStyle: { flex: 1 }
});
