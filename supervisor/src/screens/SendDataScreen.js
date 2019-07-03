import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';

import { questions } from './../data/questionnaireData';

class SendDataScreen extends Component {
  state = {};

  static navigationOptions = {
    title: 'SEND DATA',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  get dataToDispatch() {
    const { navigation } = this.props;
    const reservationID = navigation.getParam('reservationID');
    const questionnaireAnswers = navigation.getParam('questionnaireAnswers');
    const data = {
      reservationID,
      questionnaireAnswers
    };
    return data;
  }

  renderQuestionnaireData = () => {
    const questionnaireAnswers = this.dataToDispatch.questionnaireAnswers;

    return questions.map((question, index) => {
      return (
        <View key={index} style={styles.dataRow}>
          <Text style={styles.dataItem}>{question.title}:</Text>
          <Text style={styles.dataItem}>{questionnaireAnswers[question.name]}</Text>
        </View>
      );
    });
  };

  handlePressSendDataToServer = () => {
    const data = this.dataToDispatch;
    const API = 'https://ss1mo0y797.execute-api.us-east-1.amazonaws.com/dev/data';

    return fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'File successfully uploaded to S3') {
          const { navigation } = this.props;
          const reservationID = navigation.getParam('reservationID');
          navigation.navigate('Confirmation', {
            reservationID
          });
        } else {
          this.setState({
            errorMessage:
              'An error occurred in storing the data in our servers. Please press the SEND DATA button to attempt sending the data again.'
          });
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Here is the data you have provided. If you are ready to dispatch it to our servers, please
          press the button at the bottom of the table.{' '}
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.reservationID}>
            Reservation ID: {this.dataToDispatch.reservationID}
          </Text>
          {this.renderQuestionnaireData()}
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handlePressSendDataToServer}>
          <Text style={styles.buttonText}>SEND DATA</Text>
        </TouchableOpacity>
        {this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  }
}

export default SendDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  instructions: {
    fontSize: 14,
    margin: 10,
    padding: 10
  },
  dataContainer: {
    width: Dimensions.get('window').width - 20,
    margin: 10,
    borderColor: '#3CB371',
    borderWidth: 0.5,
    borderRadius: 10
  },
  reservationID: {
    height: 50,
    borderBottomColor: '#3CB371',
    borderBottomWidth: 0.5,
    fontSize: 20,
    backgroundColor: '#3CB371',
    color: 'white',
    textAlign: 'center',
    paddingTop: 10
  },
  dataRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 40,
    borderTopColor: '#3CB371',
    borderTopWidth: 0.5
  },
  dataItem: {
    fontSize: 16,
    color: '#3CB371',
    paddingLeft: 10,
    paddingRight: 10
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
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
  }
});
