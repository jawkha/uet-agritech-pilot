import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import ReservationHistoryListItem from '../components/ReservationHistoryListItem';

class ReservationHistoryScreen extends Component {
  state = {};

  static navigationOptions = {
    title: 'RESERVATION HISTORY',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  get reservationHistoryList() {
    const { navigation } = this.props;
    const reservationHistory = navigation.getParam('reservationHistory');

    return reservationHistory;
  }

  render() {
    return (
      <ScrollView>
        {this.reservationHistoryList &&
          this.reservationHistoryList.length > 0 &&
          this.reservationHistoryList.map((historyItem, index) => (
            <ReservationHistoryListItem historyItem={historyItem} key={index} />
          ))}
      </ScrollView>
    );
  }
}

export default ReservationHistoryScreen;
