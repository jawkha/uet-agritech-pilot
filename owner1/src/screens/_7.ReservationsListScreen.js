import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ReservationsListScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'ACCEPTED REQUESTS'
    };
  };

  render() {
    return (
      <View>
        <Text>ReservationsListScreen</Text>
      </View>
    );
  }
}

export default ReservationsListScreen;
