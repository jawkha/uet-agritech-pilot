import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AcceptanceConfirmationScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'CONFIRM ACCEPTANCE'
    };
  };

  render() {
    return (
      <View>
        <Text>AcceptanceConfirmationScreen</Text>
      </View>
    );
  }
}

export default AcceptanceConfirmationScreen;
