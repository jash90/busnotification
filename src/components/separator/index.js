import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
class Separator extends Component {
  render() {
    return (
      <View style={styles.contener}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

export default Separator;

const styles = StyleSheet.create({
  text: { fontSize: 20, color: "white" },
  contener: {
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
    margin: 10,
    backgroundColor: "#2196F3"
  }
});
