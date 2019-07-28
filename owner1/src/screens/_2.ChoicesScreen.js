/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';

class ChoicesScreen extends Component {
  state = {
    errorMessage: 'Generic error message. Customise it according to the nature of the error.'
  };

  get userProfile() {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    return userData;
  }

  componentDidMount = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('Permission to receive Firebase messages::::: true');
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log({ fcmToken });
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
