import React, { Component } from "react";

import { TextInput, StyleSheet } from "react-native";

export default class Input extends Component {
  render() {
    return (
      <TextInput
        underlineColorAndroid={"transparent"}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={text => this.props.onChangeText(text)}
        value={this.props.value}
        style={styles.textInputStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 20,
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    alignSelf: "center",
    margin: 10
  }
});
