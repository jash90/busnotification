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
  Button,
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

import Separator from "@components/separator";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Head back={true} right={true} text={"Edit Profile"} icon={"save"} />
        <Content style={styles.fullStyle}>
          <Logo size={100} />
          <Input underlineColorAndroid="transparent" placeholder="Firstname" />
          <Input underlineColorAndroid="transparent" placeholder="Lastname" />
          <Separator text="Change Password"/>
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
        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  fullStyle: { flex: 1 },
});
