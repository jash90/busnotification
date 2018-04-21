import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  PushNotificationIOS,
  Linking,
  DeviceEventEmitter
} from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from "moment";
import { Actions } from "react-native-router-flux";

import PickerIcon from "@components/picker-icon";
import Fab from "@components/fab";
import Logo from "@components/logo";
import GoogleButton from "@components/google-button";
import FacebookButton from "@components/facebook-button";
import Button from "@components/button";
import Input from "@components/input";
import Head from "@components/head";
import firebase from "react-native-firebase";

import BusNotification from "@components/bus-notification";
import PushNotification from "react-native-push-notification";
import AppLink from "react-native-app-link";
import PushNotificationAndroid from "react-native-push-notification";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase
      .firestore()
      .collection("notifications")
      .where("uid", "==", this.props.userId);
    this.collection = firebase.firestore().collection("notifications");

    this.state = {
      transports: [
        {
          name: "bus",
          active: true
        },
        {
          name: "train"
        },
        {
          name: "car"
        },
        {
          name: "boat"
        },
        {
          name: "jet"
        },
        {
          name: "subway"
        }
      ],
      busSchedule: [],
      modalVisible: false,
      pickerVisible: false,
      time: new Date(),
      select: null,
      direction: "",
      index: -1
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount = action => {
    this.unsubscribe();
    DeviceEventEmitter.removeListener("notificationActionReceived", action =>
      this.notificationAction(action)
    );
  };

  onCollectionUpdate = querySnapshot => {
    const busSchedule = [];
    querySnapshot.forEach(doc => {
      const { time, direction, transport, active } = doc.data();
      busSchedule.push({ time, direction, transport, active, doc });
    });
    console.log(querySnapshot);
    this.setState({ busSchedule });
  };

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

  render() {
    return (
      <Container>
        <Head
          right={true}
          icon={"person"}
          onPress={() => Actions.Person()}
          text="Transport Notification"
        />
        <View style={styles.fullStyles}>
          <FlatList
            data={this.state.busSchedule
              .sort(this.compareDate)
              .sort(this.compareNotification)}
            contentContainerStyle={styles.flatListStyle}
            renderItem={({ item }) => (
              <BusNotification
                openModal={() => this.selectTransport(item)}
                {...item}
              />
            )}
          />
          <Fab
            onPress={() =>
             Actions.Edit()
            }
            icon={"md-add"}
          />
        </View>
      </Container>
    );
  }
  selectPicker(value) {
    var tab = [];
    this.state.transports.forEach(item => {
      var obj = item;
      if (value != obj) obj.active = null;
      else {
        obj.active = true;
      }
      tab.push(obj);
    });
    this.setState({ transports: tab });
  }
  compareNotification(a, b) {
    if (a.active && !b.active) return -1;
    if (!a.active && b.active) return 1;
    return 0;
  }
  compareDate(a, b) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  }
  toggleNotification(value) {
    var tab = [];
    this.state.busSchedule.forEach(item => {
      if (value == item) {
        item.active = !item.active;
      }
      tab.push(item);
    });
    this.setState({ busSchedule: tab });
  }
  selectTransport = item => {
    var tab = [];
    this.state.transports.forEach(value => {
      var obj = value;
      if (item.transport !== obj.name) obj.active = null;
      else {
        obj.active = true;
      }
      tab.push(obj);
    });
    this.setState({
      select: item,
      transports: tab,
      time: Moment(item.time, "HH:mm").toDate(),
      direction: item.direction
    });
    Actions.Edit({
      direction: this.state.direction,
      time: this.state.time,
      select: this.state.select
    });
  };
  saveTransport = () => {
    if (this.state.direction.length == 0) {
      alert("City is empty.");
      return;
    }
    var transport = "";
    if (this.state.select == null) {
      var obj = {
        time: this.state.time,
        direction: this.state.direction,
        uid: this.props.userId,
        id: Moment().unix()
      };
      this.state.transports.forEach(element => {
        if (element.active == true) {
          obj.transport = element.name;
        }
      });
      this.collection.add(obj);
    }
    if (this.state.select != null) {
      this.state.transports.forEach(element => {
        if (element.active == true) {
          transport = element.name;
        }
      });
      this.state.select.doc.ref.update({
        time: this.state.time,
        direction: this.state.direction,
        transport
      });
      if (this.state.select.active) {
        PushNotification.cancelLocalNotifications({ id: this.state.select.id });
        PushNotification.localNotificationSchedule({
          id: this.state.select.id,
          autoCancel: false,
          color: "#2196F3", // (optional) default: system default
          title: "Transport Notification", // (optional)
          message:
            this.state.direction +
            " " +
            Moment(this.state.time).format("HH:mm") +
            " " +
            transport,
          repeatType: "day", // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
          date: Moment()
            .set({
              hours: Moment(this.state.time).hours(),
              minutes: Moment(this.state.time).minutes(),
              seconds: 0
            })
            .toDate()
        });
      }
    }
    var dateTime = new Date(Date.now() + 60 * 1000);

    this.setState({
      select: null,
      modalVisible: !this.state.modalVisible
    });
  };
}

var styles = StyleSheet.create({
  flatListStyle: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7
  },
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
  fullStyles: {
    flex: 1
  },
  colorStyle: {
    color: "#000"
  },
  modalContener: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2196f3"
  },
  contentContener: {
    flex: 1,
    alignItems: "center"
  },
  viewTime: {
    width: "90%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  textTime: {
    fontSize: 30
  }
});
