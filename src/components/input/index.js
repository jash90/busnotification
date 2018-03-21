import React, { Component } from "react";

import { TextInput, StyleSheet } from "react-native";

class Input extends Component {
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

export default Input;

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 20,
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    alignSelf: "center",
    margin: 10
  }
});
