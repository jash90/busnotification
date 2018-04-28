import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PushNotificationIOS,
  Linking,
  DeviceEventEmitter
} from "react-native";

import { Icon } from "native-base";

import Moment from "moment";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PushNotification from "react-native-push-notification";
import AppLink from "react-native-app-link";
import PushNotificationAndroid from "react-native-push-notification";

import Color from "../../Color";

export default class BusNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {
    PushNotificationAndroid.registerNotificationActions(["Yes", "No"]);
    DeviceEventEmitter.addListener("notificationActionReceived", action =>
      this.notificationAction(action)
    );
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    });
  };

  componentWillUnmount = action => {
    DeviceEventEmitter.removeListener("notificationActionReceived", action =>
      this.notificationAction(action)
    );
  };
  render() {
    return (
      <View style={styles.itemContener}>
        <TouchableOpacity onPress={() => this.onDelete()}>
          <Icon ios={"md-close"} android={"close"} style={styles.colorStyle} />
        </TouchableOpacity>
        {this.props.active ? (
          <TouchableOpacity
            style={{
              flex: 2,
              alignSelf: "center",
              alignItems: "center"
            }}
            onPress={() => this.toggleComplete()}
          >
            <MaterialIcons name="notifications" size={30} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flex: 2,
              alignSelf: "center",
              alignItems: "center"
            }}
            onPress={() => this.toggleComplete()}
          >
            <MaterialIcons name="notifications-off" size={30} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            flex: 9,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          onPress={this.props.openModal}
        >
          <View
            style={{
              width: 45
            }}
          >
            <Icon
              ios={"md-" + this.props.transport}
              android={this.props.transport}
              style={styles.colorStyle}
            />
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
    this.props.doc.ref.update({
      active: !this.props.active
    });
    if (!this.props.active) {
      PushNotification.localNotificationSchedule({
        id: this.props.id,
        autoCancel: false,
        color: Color.primaryColor, // (optional) default: system default
        title: "Transport Notification", // (optional)
        message:
          this.props.direction +
          " " +
          Moment(this.props.time).format("HH:mm") +
          " " +
          this.props.transport, // (required) // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        repeatType: "day", // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        date: Moment()
          .set({
            hours: Moment(this.props.time).hours(),
            minutes: Moment(this.props.time).minutes(),
            seconds: 0
          })
          .toDate()
      });
    } else {
      PushNotification.cancelLocalNotifications({ id: this.props.id });
    }
  }
  onDelete() {
    this.props.doc.ref.delete();
    PushNotification.cancelLocalNotifications({ id: this.props.id });
  }
  notificationAction = action => {
    console.log("Notification action received: " + action);
    const info = JSON.parse(action.dataJSON);
    if (info.action == "Yes") {
      console.log("yes");
    } else if (info.action == "No") {
      console.log("no");
    }
  };
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
