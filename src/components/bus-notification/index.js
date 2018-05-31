import React, {Component} from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PushNotificationIOS,
  Linking,
  DeviceEventEmitter
} from "react-native";

import {Icon} from "native-base";

import Moment from "moment";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PushNotification from "react-native-push-notification";
import AppLink from "react-native-app-link";
import PushNotificationAndroid from "react-native-push-notification";

import Color from "../../Color";
import Language from "../../Language";

export default class BusNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {
    PushNotification.configure({
      onRegister: function (token) {
          console.log(token);
      },
      onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    });
  };

  render() {
    return (
      <View style={styles.itemContener}>
        <TouchableOpacity onPress={() => this.onDelete()}>
          <Icon ios={"md-close"} android={"md-close"} style={styles.colorStyle}/>
        </TouchableOpacity>
        {this.props.active
          ? (
            <TouchableOpacity
              style={{
              flex: 2,
              alignSelf: "center",
              alignItems: "center"
            }}
              onPress={() => this.toggleComplete()}>
              <MaterialIcons name="notifications" size={30} color="#000"/>
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={{
              flex: 2,
              alignSelf: "center",
              alignItems: "center"
            }}
              onPress={() => this.toggleComplete()}>
              <MaterialIcons name="notifications-off" size={30} color="#000"/>
            </TouchableOpacity>
          )}
        <TouchableOpacity
          style={{
          flex: 9,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
          onPress={this.props.openModal}>
          <View style={{
            width: 45
          }}>
            <Icon
              ios={"md-" + this.props.transport}
              android={"md-" + this.props.transport}
              style={styles.colorStyle}/>
          </View>
          <Text style={styles.colorStyle}>
            {Moment(this.props.time).format("HH:mm")}
          </Text>
          <Text style={styles.colorStyle}>{this.props.direction}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  toggleComplete() {
    this
      .props
      .doc
      .ref
      .update({
        active: !this.props.active
      });
    if (!this.props.active) {
      PushNotification.localNotificationSchedule({
        id: this.props.id,
        autoCancel: false,
        color: Color.primaryColor,
        title: Language.get("appName"),
        message: this.props.direction + " " + Moment(this.props.time).format("HH:mm") + " " + Language.get(this.props.transport),
        repeatType: "day",
        date: Moment().set({
          hours: Moment(this.props.time).hours(),
          minutes: Moment(this.props.time).minutes(),
          seconds: 0
        }).toDate()
      });
    } else {
      PushNotification.cancelLocalNotifications({id: this.props.id});
    }
  }
  onDelete() {
    this
      .props
      .doc
      .ref
      .delete();
    PushNotification.cancelLocalNotifications({id: this.props.id});
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
    marginTop: 7,
    marginBottom: 7
  },
  colorStyle: {
    color: "#000",
    paddingLeft: 5,
    paddingRight: 5
  }
});
