import React, { Component } from "react";

import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Icon } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

class PickerIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.pickerContener}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={this.props.icons}
          renderItem={({ item }) =>
            item.active? (
              <LinearGradient
                colors={["#2196F3", "#E3F"]}
                style={styles.gradientIcon}
              >
                <TouchableOpacity onPress={() => this.props.select(item)}>
                  <Icon name={item.name} style={styles.activeIcon} />
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity onPress={() => this.props.select(item)}>
                <Icon name={item.name} style={styles.unActiveIcon} />
              </TouchableOpacity>
            )
          }
          horizontal={true}
        />
      </View>
    );
  }
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
