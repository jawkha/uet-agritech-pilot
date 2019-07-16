import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { apiEndpoints } from './../api/apiEndpoints';

class ChoicesScreen extends Component {
  state = {
    errorMessage: 'Generic error message. Customise it according to the nature of the error.',
    displayErrorMessage: false
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  get userProfile() {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');

    return userData;
  }

  handlePressMakeAReservationButton = async => {
    const userData = this.userProfile;
    const { navigation } = this.props;
    navigation.navigate('Search', {
      userData
    });
  };

  handlePressViewOpenRequestsButton = async => {
    console.log('View Open Requests button pressed', this.userProfile);
    /**
     * Here we will make a network request to check whether the user
     * has any open reservation requests. If they do, we will take
     * the user to the next screen along with the data returned from
     * the server. Otherwise, we'll display an appropriate error message
     * for the user here.
     */
    this.setState({ displayErrorMessage: false });

    const cnic = this.userProfile.userCnic;

    const baseUrl = apiEndpoints.farmerListOpenReservations.url;
    const constructedUrl = `${baseUrl}?cnic=${cnic}`;

    const allRequiredInputsProvided = () => {
      /**
       * We can do validation of query parameters here.
       */
      if (cnic && cnic.length === 13) {
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
          this.setState(
            {
              errorMessage:
                'You do not seem to be connected to the internet. Please check your connection settings and try again.',
              displayErrorMessage: true
            },
            () =>
              Alert.alert('Error', this.state.errorMessage, [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Button pressed')
                }
              ])
          );
        } else {
          console.log('Connected to internet');
          return fetch(constructedUrl)
            .then(response => response.json())
            .then(data => {
              console.log({ data });
              if (data.success === 0) {
                /**
                 * If UET decides to correct the spelling mistakes in this message, this custom
                 * error message will never be displayed to the user.
                 * TO DO: Before creating the release APK, check with UET if they have changed or
                 * want to change this error message.
                 */
                if (data.message === 'Currently, no reservation requests by Service Reccipient') {
                  this.setState(
                    {
                      errorMessage:
                        'There are currently no open reservation requests recorded for this user. Please make a reservation request first.',
                      displayErrorMessage: true
                    },
                    () =>
                      Alert.alert('Error', this.state.errorMessage, [
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Button pressed')
                        }
                      ])
                  );
                } else {
                  this.setState(
                    {
                      errorMessage: 'An unknown error occurred. We are sorry. Please try again.',
                      displayErrorMessage: true
                    },
                    () =>
                      Alert.alert('Error', this.state.errorMessage, [
                        {
                          text: 'OK',
                          onPress: () => console.log('OK Button pressed')
                        }
                      ])
                  );
                }
              } else {
                console.log(
                  'Reservation requests for the user successfully fetched. They will be displayed on the next screen.'
                );

                const { navigation } = this.props;
                const userData = navigation.getParam('userData');
                navigation.navigate('Open Requests List', {
                  userData,
                  openReservationRequestsList: data.reservations
                });
              }
            });
        }
      });
    }
  };

  handlePressViewHistoryButton = async => {
    console.log('View History button pressed');
    /**
     * Here we will make a network request to check whether the user
     * has any items in the reservation history section. If they do,
     * we will take the user to the next screen along with the data
     * returned from the server. Otherwise, we'll display an appropriate
     * error message for the user here.
     */
    this.setState({ displayErrorMessage: false });

    const cnic = this.userProfile.userCnic;

    const baseUrl = apiEndpoints.farmerCompletedReservationsHistory.url;
    const constructedUrl = `${baseUrl}?cnic=${cnic}`;

    const allRequiredInputsProvided = () => {
      /**
       * We can do validation of query parameters here.
       */
      if (cnic && cnic.length === 13) {
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
          this.setState(
            {
              errorMessage:
                'You do not seem to be connected to the internet. Please check your connection settings and try again.',
              displayErrorMessage: true
            },
            () =>
              Alert.alert('Error', this.state.errorMessage, [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Button pressed')
                }
              ])
          );
        } else {
          console.log('Connected to internet');
          return fetch(constructedUrl)
            .then(response => response.json())
            .then(data => {
              console.log({ data });
              if (data.success === 0) {
                this.setState(
                  {
                    errorMessage:
                      'There are currently no completed reservations recorded for this user. If you think this is a mistake, please contact customer support.',
                    displayErrorMessage: true
                  },
                  () =>
                    Alert.alert('Error', this.state.errorMessage, [
                      {
                        text: 'OK',
                        onPress: () => console.log('OK Button pressed')
                      }
                    ])
                );
              } else {
                console.log(
                  'Completed reservations list for the user successfully fetched. They will be displayed on the next screen.'
                );

                const { navigation } = this.props;
                const userData = navigation.getParam('userData');
                navigation.navigate('Reservation History', {
                  userData,
                  reservationHistory: data.reservations
                });
              }
            });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handlePressMakeAReservationButton}>
            <Text style={styles.buttonText}>MAKE A RESERVATION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePressViewOpenRequestsButton}>
            <Text style={styles.buttonText}>VIEW OPEN REQUESTS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePressViewHistoryButton}>
            <Text style={styles.buttonText}>VIEW RESERVATION HISTORY</Text>
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
    backgroundColor: '#3CB371',
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
