import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';

class ReservationRequestSentScreen extends Component {
  static navigationOptions = {
    title: 'REQUEST SENT',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  handlePressOkButton = () => {
    const { navigation } = this.props;
    navigation.navigate('Choices');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Thank you. Your reservation request has been successfully sent to the owner of the
          machinery. You can check the status of your request in the Open Requests section on the
          home screen.
        </Text>

        <TouchableOpacity style={styles.button} onPress={this.handlePressOkButton}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ReservationRequestSentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  message: {
    fontSize: 14,
    margin: 10,
    padding: 10,
    textAlign: 'center'
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
