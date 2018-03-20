/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      busSchedule: [
        {
          time: 8.15,
          direction: "Rzeszów",
          transport: "train"
        }, {
          time: 9.15,
          direction: "Rzeszów",
          transport: "bus"
        }, {
          time: 10.15,
          direction: "Rzeszów",
          transport: "train"
        }, {
          time: 11.45,
          direction: "Rzeszów",
          transport: "bus"
        }, {
          time: 12.45,
          direction: "Rzeszów",
          transport: "train"
        }, {
          time: 13.45,
          direction: "Rzeszów",
          transport: "bus"
        }
      ]
    };
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor='#1E88E5'
          style={{
          backgroundColor: '#2196F3'
        }}>
          <Body
            style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Title>TransportNotifications</Title>
          </Body>
        </Header>
        <LinearGradient
          colors={['#2196F3', '#E3F']}
          style={{
          width: "100%",
          height: "100%"
        }}>
          <Content
            style={{
            width: "100%",
            height: "100%"
          }}>

            <FlatList
              style={{
              width: "100%",
              height: "100%"
            }}
              data={this.state.busSchedule}
              contentContainerStyle={{
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10
            }}
              renderItem={({item}) => <View
              style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              width: "90%",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
              marginTop: 15
            }}>
              <Icon name={item.transport}/>
              <Text>{item.time}</Text>
              <Text>{item.direction}</Text>
            </View>}/>
          </Content>
        </LinearGradient>
      </Container>
    );
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
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
});
