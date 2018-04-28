import React, { Component } from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Icon } from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import Color from "../../Color";

export default class Fab extends Component {
  render() {
    return (
      <LinearGradient
        colors={[Color.primaryColor,Color.accentColor]}
        style={{
          width: 60,
          height: 60,
          position: "absolute",
          bottom: 20,
          right: 20,
          borderRadius: 360,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon
            name={this.props.icon}
            style={{
              color: "white",
              paddingTop: Platform.OS == "ios" ? 5 : 0
            }}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
