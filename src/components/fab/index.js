import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {Icon} from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

class Fab extends Component {
  render() {
    return (
      <LinearGradient
        colors={["#2196F3", "#E3F"]}
        style={{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 20,
        right: 20,
        borderRadius: 360,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon
            name={this.props.icon}
            style={{
            color: "white",
            paddingTop:5
          }}/>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default Fab;
