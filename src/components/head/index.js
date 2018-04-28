import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, StatusBar } from "react-native";

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

import { Actions } from "react-native-router-flux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Color from "../../Color";

export default class Head extends Component {
  render() {
    return (
      <Header androidStatusBarColor={Color.primaryColor} style={styles.styleHeader}>
        <Left style={styles.fullStyle}>{this.renderLeft()}</Left>
        <Body style={styles.textHeader}>
          <Title style={{ color: "#fff" }}>{this.props.text}</Title>
        </Body>
        <Right style={styles.fullStyle}>
          {this.props.right ? (
            <TouchableOpacity onPress={this.props.onPress}>
              <MaterialIcons
                name={this.props.icon}
                color="white"
                size={30}
                style={styles.iconRightHeader}
              />
            </TouchableOpacity>
          ) : null}
        </Right>
      </Header>
    );
  }
  renderLeft() {
    if (this.props.back) {
      return (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Icon name="arrow-back" style={styles.iconLeftHeader} />
        </TouchableOpacity>
      );
    }
    if (this.props.left) {
      return (
        <TouchableOpacity onPress={this.props.leftPress}>
          <Icon name={this.props.leftIcon} style={styles.iconLeftHeader} />
        </TouchableOpacity>
      );
    }
  }
}

var styles = StyleSheet.create({
  styleHeader: { backgroundColor: Color.primaryColor },
  textHeader: { flex: 3, justifyContent: "center", alignItems: "center" },
  iconLeftHeader: { color: "white", paddingLeft: 5 },
  iconRightHeader: { paddingRight: 5 },
  fullStyle: { flex: 1 }
});
