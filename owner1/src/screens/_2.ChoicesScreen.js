import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

import { apiEndpoints } from './../api/apiEndpoints';

class ChoicesScreen extends Component {
  state = {
    errorMessage: 'Generic error message. Customise it according to the nature of the error.',
    displayErrorMessage: false
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#2491F6'
    },
    headerTintColor: '#FFFFFF'
  };

  get userProfile() {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    return userData;
  }

  handlePressMakeAReservationButton = async => {
    console.log('View Open Requests button pressed', this.userProfile);
  };

  handlePressViewOpenRequestsButton = async => {
    console.log('View Open Requests button pressed', this.userProfile);
  };

  handlePressViewHistoryButton = async => {
    console.log('View History button pressed');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handlePressMakeAReservationButton}>
            <Text style={styles.buttonText}>PENDING RESERVATIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePressViewOpenRequestsButton}>
            <Text style={styles.buttonText}>ACCEPTED RESERVATIONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePressViewHistoryButton}>
            <Text style={styles.buttonText}>RESERVATION HISTORY</Text>
          </TouchableOpacity>
        </View>
        {/* {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )} */}
      </View>
    );
  }
}

export default ChoicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  button: {
    height: 50,
    width: 250,
    marginBottom: 25,
    borderRadius: 6,
    backgroundColor: '#2491F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal'
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
  }
});
