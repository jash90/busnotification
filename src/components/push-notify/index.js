import React, {Component} from 'react'
import { PushNotificationIOS, Linking } from "react-native";
import PushNotification from 'react-native-push-notification';
export default class PushNotify extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount = () => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
            var url = "market://details?id=pl.zimny.busnotification";
               Linking.canOpenURL(url)
                 .then(supported => {
                   if (!supported) {
                     console.log("Can't handle url: " + url);
                   } else {
                     return Linking.openURL(url);
                   }
                 })
                 .catch(err =>
                   console.error("An error occurred", err)
                 );
                
                console.log("NOTIFICATION:", notification);

                // process the notification required on iOS only (see fetchCompletionHandler
                // docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
        });
    }

    render() {
        return null;
    }
}