import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { apiEndpoints } from './../api/apiEndpoints';

class DeleteReservationScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'DELETE RESERVATION',
      headerStyle: {
        backgroundColor: '#3CB371'
      },
      headerTintColor: '#FFFFFF'
    };
  };

  handleDeleteButtonPress = () => {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    const item = navigation.getParam('item');

    console.log('Delete Button pressed');
    this.setState({ displayErrorMessage: false });

    const baseUrl = apiEndpoints.farmerDeleteReservationRequest.url;
    const constructedUrl = `${baseUrl}?rid=${item.rid}`;

    const allRequiredInputsProvided = () => {
      /**
       * We can do validation of query parameters here.
       */
      if (item.rid && item.rid !== '') {
        return true;
      } else {
        return false;
      }
    };

    if (allRequiredInputsProvided() === true) {
      return NetInfo.fetch().then(NetInfoState => {
        console.log('Connection type', NetInfoState);
        console.log('Is connected?', NetInfoState.isConnected);
        if (NetInfoState.isConnected === false) {
          this.setState({
            errorMessage:
              'You do not seem to be connected to the internet. Please check your connection settings and try again.',
            displayErrorMessage: true
          });
        } else {
          console.log('Connected to internet');
          return fetch(constructedUrl)
            .then(response => response.json())
            .then(data => {
              console.log({ data });
              if (data.success === 0) {
                this.setState({
                  errorMessage:
                    'An unknown error occurred. We are sorry. Please try again. If the error persists, please restart the app.',
                  displayErrorMessage: true
                });
              } else {
                console.log(
                  `Reservation request with the ID ${
                    item.rid
                  } has been deleted. The user will be taken to the open reservations list screen.`
                );

                navigation.navigate('Choices', { userData });
              }
            });
        }
      });
    }
  };

  handleCancelButtonPress = () => {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');

    console.log('Cancel Button pressed');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textMessage}>
          Are you sure you want to delete this reservation request? You will not be able to undo
          this action. Press Delete to confirm or press Cancel to go back to the previous screen.
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={this.handleDeleteButtonPress}>
            <Text style={styles.buttonText}>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={this.handleCancelButtonPress}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
        {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  }
}

export default DeleteReservationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  textMessage: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14,
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  deleteButton: {
    borderRadius: 6,
    backgroundColor: '#E00E0E',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  cancelButton: {
    borderRadius: 6,
    backgroundColor: '#3CB371',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase'
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
  }
});
