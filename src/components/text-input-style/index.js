import React, { Component } from 'react';
import { TextInput } from 'react-native'

class TextInputStyle extends Component {
    render() {
        return (
            {
                borderRadius: 20,
                width: "90%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 20,
                alignSelf: "center",
                margin: 10
              }
        );
    }
}

export default TextInputStyle;