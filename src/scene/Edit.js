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

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("notifications")
      .where("uid", "==", this.props.userId);
    this.collection = firebase.firestore().collection("notifications");

    this.state = {
      busSchedule: [],
      modalVisible: false,
      pickerVisible: false,
      time: new Date(),
      select: null,
      direction: "",
      index: -1
    };
  }
  componentWillMount = () => {
    if (this.props.time) {
      this.setState({ time: this.props.time });
    }
    if (this.props.select) {
      this.setState({ select: this.props.select });
    }
    if (this.props.direction) {
      this.setState({ direction: this.props.direction });
    }
  };

  render() {
    return (
      <View style={styles.modalContener}>
        <Head
          left={true}
          leftIcon={"close"}
          leftPress={() => Actions.Home()}
          text={"Add Transport"}
          right={true}
          icon={"save"}
          onPress={() => this.saveTransport()}
        />
        <LinearGradient
          colors={["#2196F3", "#E3F"]}
          style={styles.contentContener}
        >
          <PickerIcon select={item => this.selectPicker(item)} />
          <View style={styles.viewTime}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  pickerVisible: !this.state.pickerVisible
                })
              }
            >
              <Text style={styles.textTime}>
                {Moment(this.state.time).format("HH:mm")}
              </Text>
            </TouchableOpacity>
            <Icon name="time" />
          </View>
          <Input
            underlineColorAndroid="transparent"
            placeholder="Enter City"
            value={this.state.direction}
            onChangeText={text => this.setState({ direction: text })}
          />
        </LinearGradient>
        <DateTimePicker
          date={this.state.time}
          isVisible={this.state.pickerVisible}
          onConfirm={time => this.setState({ time })}
          onCancel={() =>
            this.setState({
              pickerVisible: !this.state.pickerVisible
            })
          }
          mode={"time"}
        />
      </View>
    );
  }
  selectPicker(item) {
    this.setState({ select: item.index });
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
      city: item.direction,
      modalVisible: !this.state.modalVisible
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
