import React, { Component } from 'react';
import { View, Text } from 'react-native';

class RejectionConfirmationScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'CONFIRM REJECTION'
    };
  };

  render() {
    return (
      <View>
        <Text>RejectionConfirmationScreen</Text>
      </View>
    );
  }
}

export default RejectionConfirmationScreen;
