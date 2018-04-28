import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import Color from "../../Color";

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <LinearGradient
        colors={[Color.primaryColor, Color.accentColor]}
        style={{
          borderRadius: 20,
          width: this.props.size,
          height: this.props.size,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          margin: 10
        }}
      >
        <TouchableOpacity>
          <Icon
            name={"md-bus"}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              fontSize: this.props.size - 20,
              alignSelf: "center"
            }}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
