import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ReservationDetailScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'REQUEST DETAILS'
    };
  };

  render() {
    return (
      <View>
        <Text>ReservationDetailScreen</Text>
      </View>
    );
  }
}

export default ReservationDetailScreen;
