import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

class GoogleButton extends Component {
  render() {
    return (
      <View
        style={{
          borderRadius: 20,
          width: "90%",
          height: 60,
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => this.props.onPress}
        >
          <Image
            source={require("../../img/google.jpg")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: "#756d6d", fontSize: 20, paddingLeft: 10 }}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default GoogleButton;
