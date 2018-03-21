/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  Fab,
  FooterTab,
  Button,
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

export default class App extends Component {
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
      time: new Date()
    };
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#1E88E5"
          style={{ backgroundColor: "#2196F3" }}
        >
          <Body
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Title>TransportNotifications</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.busSchedule}
            contentContainerStyle={{
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "90%",
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 10,
                  marginTop: 15
                }}
              >
                {item.active ? (
                  <TouchableOpacity>
                    <MaterialIcons
                      name="notifications"
                      size={30}
                      color="#2196F3"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <MaterialIcons
                      name="notifications-none"
                      size={30}
                      color="#2196F3"
                    />
                  </TouchableOpacity>
                )}
                <Icon name={item.transport} style={{ color: "#2196F3" }} />
                <Text style={{ color: "#2196F3" }}>{item.time}</Text>
                <Text style={{ color: "#2196F3" }}>{item.direction}</Text>
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
          >
            <View style={{ width: "100%", height: "100%" }}>
              <Header
                androidStatusBarColor="#1E88E5"
                style={{ backgroundColor: "#2196F3" }}
              >
                <Left>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        modalVisible: !this.state.modalVisible
                      })
                    }
                  >
                    <Icon
                      name="close"
                      style={{ color: "white", paddingLeft: 10 }}
                    />
                  </TouchableOpacity>
                </Left>
                <Body
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Title>Add Transport</Title>
                </Body>
                <Right>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        modalVisible: !this.state.modalVisible
                      })
                    }
                  >
                    <MaterialIcons name="save" color="white" size={30} />
                  </TouchableOpacity>
                </Right>
              </Header>
              <LinearGradient
                colors={["#2196F3", "#E3F"]}
                style={{ flex: 1, alignItems: "center" }}
              >
                <View
                  style={{
                    width: "90%",
                    height: 60,
                    backgroundColor: "white",
                    borderRadius: 20,
                    marginTop: 20
                  }}
                >
                  <FlatList
                    contentContainerStyle={{
                      flex: 1,
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                    data={this.state.transports}
                    renderItem={({ item }) =>
                      item.active ? (
                        <LinearGradient
                          colors={["#2196F3", "#E3F"]}
                          style={{ borderRadius: 20 }}
                        >
                          <TouchableOpacity onPress={() => this.select(item)}>
                            <Icon
                              name={item.name}
                              style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                color: "white"
                              }}
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      ) : (
                        <TouchableOpacity onPress={() => this.select(item)}>
                          <Icon
                            name={item.name}
                            style={{ paddingLeft: 10, paddingRight: 10 }}
                          />
                        </TouchableOpacity>
                      )
                    }
                    horizontal={true}
                  />
                </View>
                <View
                  style={{
                    width: "90%",
                    height: 60,
                    backgroundColor: "white",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        pickerVisible: !this.state.pickerVisible
                      })
                    }
                  >
                    <Text style={{ fontSize: 30 }}>
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
                  query={
                    {
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: "AIzaSyBeIXsxelUaQPIy7i4l33s-us8UC_m0gl0",
                      language: "pl",
                      types: "(cities)"
                    } // language of the results // default: 'geocode'
                  }
                  styles={{
                    description: { color: "#fff" }
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
          <LinearGradient
            colors={["#2196F3", "#E3F"]}
            style={{
              width: 60,
              height: 60,
              position: "absolute",
              bottom: 20,
              right: 20,
              borderRadius: 360,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  modalVisible: !this.state.modalVisible
                })
              }
            >
              <Icon name="add" style={{ color: "white", padding: 20 }} />
            </TouchableOpacity>
          </LinearGradient>
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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  }
});
