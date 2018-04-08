import React, {Component} from 'react'
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
                console.log('NOTIFICATION:', notification);

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