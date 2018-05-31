import React, {Component} from "react";
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
import {Actions} from "react-native-router-flux";

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

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.collection = firebase
      .firestore()
      .collection("notifications");

    this.state = {
      busSchedule: [],
      modalVisible: false,
      pickerVisible: false,
      time: new Date(),
      transport: "",
      direction: "",
      index: -1
    };
  }
  componentWillMount = () => {
    if (this.props.item) {
      if (this.props.item.time) {
        this.setState({time: this.props.item.time});
      }
      if (this.props.item.transport) {
        this.setState({transport: this.props.item.transport});
      }
      if (this.props.item.direction) {
        this.setState({direction: this.props.item.direction});
      }
    }
  };

  render() {
    return (
      <View style={styles.modalContener}>
        <Head
          left={true}
          leftIcon={"close"}
          leftPress={() => Actions.pop()}
          text={Language.get("editProfile")}
          right={true}
          icon={"save"}
          onPress={() => this.saveTransport()}/>
        <LinearGradient
          colors={[Color.primaryColor, Color.accentColor]}
          style={styles.contentContener}>
          <PickerIcon
            onChange={item => this.selectPicker(item)}
            select={this.state.transport}/>
          <View style={styles.viewTime}>
            <TouchableOpacity
              onPress={() => this.setState({
              pickerVisible: !this.state.pickerVisible
            })}>
              <Text style={styles.textTime}>
                {Moment(this.state.time).format("HH:mm")}
              </Text>
            </TouchableOpacity>
            <Icon ios="md-time" android="md-time"/>
          </View>
          <Input
            underlineColorAndroid="transparent"
            placeholder={Language.get("enterCity")}
            value={this.state.direction}
            onChangeText={text => this.setState({direction: text})}/>
        </LinearGradient>
        <DateTimePicker
          date={this.state.time}
          isVisible={this.state.pickerVisible}
          onConfirm={time => this.setState({time})}
          onCancel={() => this.setState({
          pickerVisible: !this.state.pickerVisible
        })}
          mode={"time"}/>
      </View>
    );
  }
  selectPicker(item) {
    this.setState({transport: item.item});
  }
  saveTransport = () => {
    if (this.state.direction.length == 0) {
      alert(Language.get("cityRequired"));
      return;
    }
    if (this.props.item) {
      if (this.props.item.doc) {
        this
          .props
          .item
          .doc
          .ref
          .update({time: this.state.time, direction: this.state.direction, transport: this.state.transport, active: false});
      }
    } else {
      this
        .collection
        .add({
          time: this.state.time,
          direction: this.state.direction,
          transport: this.state.transport,
          id: Moment().unix(),
          uid: this.props.userId,
          active: false
        });
    }
    Actions.pop();
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
