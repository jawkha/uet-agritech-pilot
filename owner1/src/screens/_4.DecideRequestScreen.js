import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DecideRequestScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'REQUEST DETAIL'
    };
  };

  render() {
    return (
      <View>
        <Text>DecideRequestScreen</Text>
      </View>
    );
  }
}

export default DecideRequestScreen;
