/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';

import { apiEndpoints } from './../api/apiEndpoints';

class ChoicesScreen extends Component {
  state = {
    errorMessage: 'Generic error message. Customise it according to the nature of the error.'
  };

  get userProfile() {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    return userData;
  }

  alertUser = (type, content) => {
    Alert.alert(type, content, [
      {
        text: 'OK',
        onPress: () => console.log('OK Button pressed')
      }
    ]);
  };

  isDeviceOnline = async () => {
    const NetInfoState = await NetInfo.fetch();
    const { isConnected } = NetInfoState;

    if (isConnected === false) {
      this.setState(
        {
          errorMessage:
            'You do not seem to be connected to the internet. Please check your connection settings and try again.'
        },
        () => this.alertUser('Error', this.state.errorMessage)
      );
    }
    return isConnected;
  };

  componentDidMount = async () => {
    /**
     * The sequence of steps would be as follows:
     * 1. Permissions --> Check, Request
     * 2. Device token for FCM --> Retrieve, Generate, Refresh
     * 3. Device token sent to servers
     * 4. Device token saved in AsyncStorage
     * 5. React to notifications --> Navigate to different screens based on notification type
     * 6. React to changes in FCM token through device change, app reinstall, app update, etc.
     */
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('Permission to receive Firebase messages::::: true');
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        const baseUrl = apiEndpoints.ownerDeviceTokenRegistration.url;
        const ownerId = this.userProfile.userProfileData.id;
        const constructedUrl = `${baseUrl}?oid=${ownerId}&token=${fcmToken}`;
        console.log({ constructedUrl });

        // SEND OWNER DEVICE TOKEN TO SERVER FOR PUSH NOTIFICATIONS
        const connectionStatus = await this.isDeviceOnline();
        if (connectionStatus === true) {
          console.log('Connected to internet');
          const response = await fetch(constructedUrl);
          const data = await response.json();
          console.log({ data });
        }
        this.messageListener = firebase.messaging().onMessage(message => {
          console.log('Reacting to firebase messages on Choices screen', { message });
        });

        this.notificationDisplayedListener = firebase
          .notifications()
          .onNotificationDisplayed(notification => {
            console.log(
              'Reacting to firebase notification on Choices screen from notificationDisplayedListener',
              { notification }
            );
          });
        this.notificationListener = firebase.notifications().onNotification(notification => {
          console.log(
            'Reacting to firebase notification on Choices screen from notificationListener',
            { notification }
          );
        });

        this.notificationOpenedListener = firebase
          .notifications()
          .onNotificationOpened(notificationOpen => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notificationOpenedConst = notificationOpen.notification;
            console.log({ action }, { notificationOpenedConst });
          });
      } else {
        console.log('No device token for FCM');
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
          console.log('New FCM token generated', { fcmToken });
        });
      }
    } else {
      await firebase.messaging().requestPermission();
    }
  };

  componentWillUnmount = () => {
    this.messageListener();
    this.onTokenRefreshListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  };

  handlePendingReservationsButtonPress = () => {
    this.props.navigation.navigate('RequestsList', { userData: this.userProfile });
  };

  handleAcceptedReservationsButtonPress = () => {
    this.props.navigation.navigate('ReservationsList', { userData: this.userProfile });
  };

  handleReservationHistoryButtonPress = () => {
    this.props.navigation.navigate('ReservationsHistory', { userData: this.userProfile });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePendingReservationsButtonPress}
          >
            <Text style={styles.buttonText}>PENDING RESERVATIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleAcceptedReservationsButtonPress}
          >
            <Text style={styles.buttonText}>ACCEPTED RESERVATIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleReservationHistoryButtonPress}
          >
            <Text style={styles.buttonText}>RESERVATION HISTORY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChoicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  button: {
    height: 50,
    width: 250,
    marginBottom: 25,
    borderRadius: 6,
    backgroundColor: '#2491F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal'
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
  }
});
