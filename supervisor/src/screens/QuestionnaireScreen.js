import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity
} from 'react-native';

import { questions } from './../data/questionnaireData';

class QuestionnaireScreen extends Component {
  state = {
    machineryType: '',
    soilType: '',
    irrigationSource: '',
    lastCropSown: '',
    nextCropToBeSown: '',
    fuelUsed: ''
  };

  static navigationOptions = {
    title: 'QUESTIONNAIRE',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  handleTextInputChange = (text, question) => {
    this.setState({ [question.name]: text.replace(/\s/g, '') }, () =>
      console.log(question.name, this.state[question.name])
    );
  };

  displayPickerOrTextInput = question => {
    if (question.choices !== null) {
      return (
        <Picker
          mode="dropdown"
          selectedValue={
            this.state[question.name] === '' ? question.choices[0] : this.state[question.name]
          }
          style={styles.picker}
          onValueChange={(value, index) =>
            this.setState({ [question.name]: value }, () => console.log(this.state[question.name]))
          }
        >
          {question.choices.map((choice, index) => {
            return <Picker.Item key={index} label={choice} value={choice} />;
          })}
        </Picker>
      );
    } else {
      return (
        <TextInput
          style={styles.inputText}
          onChangeText={text => this.handleTextInputChange(text, question)}
          value={this.state[question.name]}
          autoCapitalize="words"
          autoCorrect={false}
        />
      );
    }
  };

  areAllQuestionsAnswered = () => {
    console.log('checking if all questions answered');
    return true;
  };

  handlePress = async => {
    const { navigation } = this.props;
    const reservationID = navigation.getParam('reservationID');

    if (this.areAllQuestionsAnswered() === true) {
      const { navigation } = this.props;
      navigation.navigate('Send', {
        reservationID,
        questionnaireAnswers: this.state
      });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {questions.map((question, index) => {
          console.log({ question });
          return (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{question.title.toUpperCase()}</Text>
              <Text style={styles.questionText}>{question.questionText}</Text>
              {this.displayPickerOrTextInput(question)}
            </View>
          );
        })}
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 10
  },
  questionContainer: {
    height: 150,
    width: Dimensions.get('window').width - 20,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10
  },
  questionTitle: {
    // backgroundColor: '#3CB371',
    color: '#3CB371',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10
  },
  questionText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    paddingLeft: 10
  },
  inputText: {
    marginTop: 10,
    marginBottom: 0,
    padding: 10,
    borderColor: '#3CB371',
    borderWidth: 0.2,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  picker: {
    width: Dimensions.get('window').width - 20
  },
  button: {
    height: 50,
    width: 250,
    margin: 10,
    borderRadius: 6,
    backgroundColor: '#3CB371',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 40,
    alignItems: 'center',
    textAlign: 'center'
  }
});
