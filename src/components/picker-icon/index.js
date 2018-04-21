import React, { Component } from "react";

import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Icon } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

class PickerIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transports: [
        { name: "bus" },
        { name: "train" },
        { name: "car" },
        { name: "boat" },
        { name: "jet" },
        { name: "subway" }
      ],
      select: 0
    };
  }
  render() {
    return (
      <View style={styles.pickerContener}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={this.state.transports}
          extraData={this.state.select}
          renderItem={item =>
            item.index == this.state.select ? (
              <LinearGradient
                colors={["#2196F3", "#E3F"]}
                style={styles.gradientIcon}
              >
                <TouchableOpacity onPress={() => this.onChange(item)}>
                  <Icon name={item.item.name} style={styles.activeIcon} />
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity onPress={() => this.onChange(item)}>
                <Icon name={item.item.name} style={styles.unActiveIcon} />
              </TouchableOpacity>
            )
          }
          horizontal={true}
        />
      </View>
    );
  }
  onChange = item => {
    this.setState({ select: item.index });
    this.props.select(item);
  };
}

export default PickerIcon;

const styles = StyleSheet.create({
  unActiveIcon: { paddingLeft: 10, paddingRight: 10 },
  activeIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    color: "white"
  },
  gradientIcon: { borderRadius: 20 },
  flatListStyle: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  pickerContener: {
    width: "90%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 20
  }
});
