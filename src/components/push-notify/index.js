import React, { Component } from "react";
import { PushNotificationIOS, Linking, DeviceEventEmitter } from "react-native";
import PushNotification from "react-native-push-notification";
import AppLink from "react-native-app-link";
import PushNotificationAndroid from "react-native-push-notification";
export default class PushNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {
    // Register all the valid actions for notifications here and add the action handler for each action
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
    return null;
  }
  notificationAction = (action) => {
    console.log("Notification action received: " + action);
    const info = JSON.parse(action.dataJSON);
    if (info.action == "Yes") {
      console.log("yes");
    } else if (info.action == "No") {
      console.log("no");
    }
  };
}
