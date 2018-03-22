import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput
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
      busSchedule: [
        {
          time: 8.15,
          direction: "Rzeszów",
          transport: "train",
          active: true
        },
        {
          time: 9.15,
          direction: "Rzeszów",
          transport: "car"
        },
        {
          time: 10.15,
          direction: "Rzeszów",
          transport: "train"
        },
        {
          time: 11.45,
          direction: "Rzeszów",
          transport: "bus"
        },
        {
          time: 12.45,
          direction: "Rzeszów",
          transport: "car",
          active: true
        },
        {
          time: 13.45,
          direction: "Rzeszów",
          transport: "bus"
        },
        {
          time: 14.45,
          direction: "Rzeszów",
          transport: "bus"
        },
        {
          time: 15.45,
          direction: "Rzeszów",
          transport: "bus",
          active: true
        },
        {
          time: 16.45,
          direction: "Rzeszów",
          transport: "bus"
        },
        {
          time: 16.45,
          direction: "Rzeszów",
          transport: "bus"
        },
        {
          time: 16.45,
          direction: "Rzeszów",
          transport: "bus"
        }
      ],
      modalVisible: false,
      pickerVisible: false,
      time: new Date(),
      select: null
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
            data={this.state.busSchedule}
            contentContainerStyle={styles.flatListStyle}
            renderItem={({ item }) => (
              <View style={styles.itemContener}>
                {item.active ? (
                  <TouchableOpacity>
                    <MaterialIcons
                      name="notifications"
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <MaterialIcons
                      name="notifications-none"
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>
                )}
                <Icon name={item.transport} style={styles.blueColorStyle} />
                <Text style={styles.blueColorStyle}>{item.time}</Text>
                <Text style={styles.blueColorStyle}>{item.direction}</Text>
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
                  this.setState({ modalVisible: !this.state.modalVisible })
                }
                text={"Add Transport"}
                right={true}
                icon={"save"}
                onPress={() =>
                  this.setState({
                    modalVisible: !this.state.modalVisible
                  })
                }
              />
              <LinearGradient
                colors={["#2196F3", "#E3F"]}
                style={styles.contentContener}
              >
                <PickerIcon
                  icons={this.state.transports}
                  select={this.state.select}
                  select={item => this.select(item)}
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
                <GooglePlacesAutocomplete
                  placeholder="Enter Location"
                  minLength={2}
                  autoFocus={false}
                  returnKeyType={"default"}
                  fetchDetails={true}
                  query={{
                    key: "AIzaSyBeIXsxelUaQPIy7i4l33s-us8UC_m0gl0",
                    language: "pl",
                    types: "(cities)"
                  }}
                  styles={{
                    container: { width: "100%" },
                    description: { color: "white", width: "100%" },
                    textInputContainer: {
                      width: "95%",
                      height: 60,
                      alignSelf: "center",
                      backgroundColor: "transparent"
                    },
                    textInput: {
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignSelf: "center",
                      borderRadius: 20,
                      fontSize: 20,
                      paddingLeft:15,
                      paddingRight:15
                    },
                    loader: {},
                    listView: { width: "90%", alignSelf: "center" },
                    predefinedPlacesDescription: { width: "90%" },
                    poweredContainer: { width: "100%" },
                    powered: {},
                    separator: { color: "white" }
                  }}
                  currentLocation={false}
                />
              </LinearGradient>
            </View>
          </Modal>
          <DateTimePicker
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
  select(value) {
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
  blueColorStyle: { color: "#000" },
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
