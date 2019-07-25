import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ReservationsHistoryScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'RESERVATION HISTORY'
    };
  };

  render() {
    return (
      <View>
        <Text>ReservationsHistoryScreen</Text>
      </View>
    );
  }
}

export default ReservationsHistoryScreen;
