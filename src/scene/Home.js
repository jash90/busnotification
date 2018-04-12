import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
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
import PushNotify from "@components/push-notify";

import PushNotification from "react-native-push-notification";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase
      .firestore()
      .collection("notifications")
      .doc(this.props.userId)
      .collection("notifications");

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
      city: "",
      index: -1
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const busSchedule = [];
    querySnapshot.forEach(doc => {
      const { time, direction, transport, active } = doc.data();
      busSchedule.push({ time, direction, transport, active, doc });
    });
    console.log(querySnapshot);
    this.setState({ busSchedule });
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
          <Modal
            visible={this.state.modalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() =>
              this.setState({
                modalVisible: !this.state.modalVisible
              })
            }
            animationType={"slide"}
          >
            <View style={styles.modalContener}>
              <Head
                left={true}
                leftIcon={"close"}
                leftPress={() =>
                  this.setState({
                    modalVisible: !this.state.modalVisible
                  })
                }
                text={"Add Transport"}
                right={true}
                icon={"save"}
                onPress={() => this.saveTransport()}
              />
              <LinearGradient
                colors={["#2196F3", "#E3F"]}
                style={styles.contentContener}
              >
                <PickerIcon
                  icons={this.state.transports}
                  select={this.state.select}
                  select={item => this.selectPicker(item)}
                />
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
                  value={this.state.city}
                  onChangeText={text => this.setState({ city: text })}
                />
              </LinearGradient>
            </View>
            <PushNotify />
          </Modal>
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
          <Fab
            onPress={() =>
              this.setState({
                modalVisible: !this.state.modalVisible
              })
            }
            icon={"add"}
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
      city: item.direction,
      modalVisible: !this.state.modalVisible
    });
  };
  saveTransport = () => {
    if (this.state.select == null) {
      var obj = {
        time: this.state.time,
        direction: this.state.city
      };
      this.state.transports.forEach(element => {
        if (element.active == true) {
          obj.transport = element.name;
        }
      });
      this.ref.add(obj);
    }
    if (this.state.select != null) {
      var transport = "";
      this.state.transports.forEach(element => {
        if (element.active == true) {
          transport = element.name;
        }
      });
      this.state.select.doc.ref.update({
        time: this.state.time,
        direction: this.state.city,
        transport
      });
    }
    var dateTime = new Date(Date.now() + 60 * 1000);
    PushNotification.localNotificationSchedule({
      /* Android Only Properties */
      // (optional) Valid unique 32 bit integer specified as string. default:
      // Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: false, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

      /* iOS and Android properties */
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      repeatType: "day", // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      actions: '["Yes", "No"]',
      date: dateTime // in 60 secs
    });
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
    paddingTop:7,
    paddingBottom:7
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
