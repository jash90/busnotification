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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transports: [
        { name: "bus", active: true },
        { name: "train" },
        { name: "car" },
        { name: "boat" },
        { name: "jet" },
        { name: "subway" }
      ],
      busSchedule: [
        {
          time: "8:15",
          direction: "Rzeszów",
          transport: "train",
          active: true
        },
        { time: "9:15", direction: "Rzeszów", transport: "car" },
        { time: "10:15", direction: "Rzeszów", transport: "train" },
        { time: "11:45", direction: "Rzeszów", transport: "bus" },
        { time: "12:45", direction: "Rzeszów", transport: "car", active: true },
        { time: "13:45", direction: "Rzeszów", transport: "bus" },
        { time: "14:45", direction: "Rzeszów", transport: "bus" },
        { time: "15:45", direction: "Rzeszów", transport: "bus", active: true },
        { time: "16:45", direction: "Rzeszów", transport: "bus" },
        { time: "17:45", direction: "Rzeszów", transport: "bus" },
        { time: "18:45", direction: "Rzeszów", transport: "bus" }
      ],
      modalVisible: false,
      pickerVisible: false,
      time: new Date(),
      select: null,
      city: ""
    };
  }

  render() {
    return (
      <Container>
        <Head
          right={true}
          icon={"person"}
          onPress={() => Actions.Login()}
          text="Transport Notification"
        />
        <View style={styles.fullStyles}>
          <FlatList
            data={this.state.busSchedule
              .sort(this.compareDate)
              .sort(this.compareNotification)}
            contentContainerStyle={styles.flatListStyle}
            renderItem={({ item }) => (
              <View style={styles.itemContener}>
                {item.active ? (
                  <TouchableOpacity
                    style={{
                      flex: 2,
                      alignSelf: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.toggleNotification(item)}
                  >
                    <MaterialIcons
                      name="notifications"
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      flex: 2,
                      alignSelf: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.toggleNotification(item)}
                  >
                    <MaterialIcons
                      name="notifications-off"
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    flex: 9,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                  onPress={() => this.selectTransport(item)}
                >
                  <Icon name={item.transport} style={styles.colorStyle} />
                  <Text style={styles.colorStyle}>{item.time}</Text>
                  <Text style={styles.colorStyle}>{item.direction}</Text>
                </TouchableOpacity>
              </View>
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
    // const {busSchedule} = this.state;
    // var item = busSchedule.indexOf(this.state.select);
    // busSchedule.splice(item,1);
    var item = {
      time: Moment(this.state.time).format("HH:mm"),
      direction: this.state.city
    };
    this.state.transports.forEach(element => {
      if (element.active == true) {
        item.transport = element.name;
      }
    });
    if (this.state.select != null) {
      if (this.state.select.active == true)
        item.active = this.state.select.active;
      var index = this.state.busSchedule.indexOf(this.state.select);
      console.log(index);
      if (index > -1) {
        this.state.busSchedule.splice(index, 1);
      }
    }

    const { busSchedule } = this.state;
    busSchedule.push(item);
    this.setState({
      busSchedule,
      select: null,
      modalVisible: !this.state.modalVisible
    });
  };
}

var styles = StyleSheet.create({
  flatListStyle: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
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
  fullStyles: { flex: 1 },
  colorStyle: { color: "#000" },
  modalContener: { width: "100%", height: "100%", backgroundColor: "#2196f3" },
  contentContener: { flex: 1, alignItems: "center" },
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
  textTime: { fontSize: 30 }
});
