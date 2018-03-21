import React, { Component } from "react";

import { TouchableOpacity, View, Text } from "react-native";

class Button extends Component {
  render() {
    return (
      <View
        style={{
          borderRadius: 20,
          width: "90%",
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2196F3",
          alignSelf:"center"
        }}
      >
        <TouchableOpacity onPress={() => this.props.onPress}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Button;
