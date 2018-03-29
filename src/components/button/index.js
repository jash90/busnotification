import React, { Component } from "react";

import { TouchableOpacity, View, Text } from "react-native";

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ width: "100%", height: 60 }}
        onPress={this.props.onPress}
      >
        <View
          style={{
            borderRadius: 20,
            width: "90%",
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2196F3",
            alignSelf: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;
