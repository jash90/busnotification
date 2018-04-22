import React, { Component } from "react";

import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Icon } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import _ from "lodash";
class PickerIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transports: ["bus", "train", "car", "boat", "jet", "subway"],
      select: 0
    };
  }
  componentWillMount = () => {
    if (this.props) {
      if (this.props.select) {
        console.log(this.props.select);
        var index = _.indexOf(this.state.transports, String(this.props.select));
        console.log(index);
        if (index > -1) {
          this.setState({ select: index });
        }
      }
    }
  };

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
                  <Icon name={item.item} style={styles.activeIcon} />
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity onPress={() => this.onChange(item)}>
                <Icon name={item.item} style={styles.unActiveIcon} />
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
    this.props.onChange(item);
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
