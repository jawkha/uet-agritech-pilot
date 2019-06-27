import React, { Component } from 'react';
import { View, Text } from 'react-native';

class QuestionnaireScreen extends Component {
  state = {};

  static navigationOptions = {
    title: 'Questionnaire'
  };

  render() {
    return (
      <View>
        <Text>QuestionnaireScreen</Text>
      </View>
    );
  }
}

export default QuestionnaireScreen;
