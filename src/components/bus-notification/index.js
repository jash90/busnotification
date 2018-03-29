import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import Moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
class BusNotification extends Component {
  render() {
    return (
      <View style={styles.itemContener}>
        {this.props.active ? (
          <TouchableOpacity
            style={{ flex: 2, alignSelf: "center", alignItems: "center" }}
            onPress={() => this.toggleComplete()}
          >
            <MaterialIcons name="notifications" size={30} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ flex: 2, alignSelf: "center", alignItems: "center" }}
            onPress={() => this.toggleComplete()}
          >
            <MaterialIcons name="notifications-off" size={30} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            flex: 9,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
          onPress={this.props.openModal}
        >
          <Icon name={this.props.transport} style={styles.colorStyle} />
          <Text style={styles.colorStyle}>
            {Moment(this.props.time).format("HH:mm")}
          </Text>
          <Text style={styles.colorStyle}>{this.props.direction}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  toggleComplete() {
    console.log(this.props);
    this.props.doc.ref.update({
      active: !this.props.active
    });
  }
}
var styles = StyleSheet.create({
  itemContener: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginTop: 15
  },
  colorStyle: { color: "#000" }
});

export default BusNotification;
