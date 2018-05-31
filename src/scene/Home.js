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
import Color from "../Color";
import Language from "../Language";
import BusNotification from "@components/bus-notification";
import PushNotification from "react-native-push-notification";
import AppLink from "react-native-app-link";
import PushNotificationAndroid from "react-native-push-notification";
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase
      .firestore()
      .collection("notifications")
      .where("uid", "==", this.props.userId);
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
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount = action => {
    this.unsubscribe();
    // DeviceEventEmitter.removeListener("notificationActionReceived", action => this.notificationAction(action));
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
    // Language.setL("pl");
    // PushNotificationAndroid.registerNotificationActions(["Yes", "No"]);
    // DeviceEventEmitter.addListener("notificationActionReceived", action => this.notificationAction(action));
    PushNotification.configure({
      onRegister: function(token) {
        //  console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        //  console.log("NOTIFICATION:", notification);
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
          text={Language.get("appName")}
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
            onPress={() => Actions.Edit({ userId: this.props.userId })}
            icon={"md-add"}
          />
            <Banner
            unitId={"ca-app-pub-6050856662811628/6621133969"}
            size={"SMART_BANNER"}
            request={
              request.build()
            }
            onAdLoaded={
              () => {
                console.log('Advert loaded');
              }
            }
            />
        </View>
      </Container>
    );
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
  selectTransport = item => {
    Actions.Edit({ item, userId: this.props.userId });
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
    backgroundColor: Color.primaryColor
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
