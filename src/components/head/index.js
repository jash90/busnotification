import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

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

class Head extends Component {
  render() {
    return (
      <Header androidStatusBarColor="#1E88E5" style={styles.styleHeader}>
        <Left style={styles.fullStyle}>
          {this.props.left ? (
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Icon name="arrow-back" style={styles.iconLeftHeader} />
            </TouchableOpacity>
          ) : null}
        </Left>
        <Body style={styles.textHeader}>
          <Title>{this.props.text}</Title>
        </Body>
        <Right style={styles.fullStyle}>
          {this.props.right ? (
            <TouchableOpacity onPress={this.props.onPress}>
              <Icon name={this.props.icon} style={styles.iconRightHeader} />
            </TouchableOpacity>
          ) : null}
        </Right>
      </Header>
    );
  }
}

export default Head;
var styles = StyleSheet.create({
  styleHeader: { backgroundColor: "#2196F3" },
  textHeader: { justifyContent: "center", alignItems: "center" },
  iconLeftHeader: { color: "white", paddingLeft: 5 },
  iconRightHeader: { color: "white", paddingRight: 5 },
  fullStyle: { flex: 1 }
});
