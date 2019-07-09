import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

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
    const userCnic = navigation.getParam('cnic');
    const userProfileData = navigation.getParam('userProfileData');

    const userData = {
      userCnic,
      userProfileData
    };
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
    /**
     * Here we will make a network request to check whether the user
     * has any open reservation requests. If they do, we will take
     * the user to the next screen along with the data returned from
     * the server. Otherwise, we'll display an appropriate error message
     * for the user here.
     */
    console.log('View Open Requests button pressed');
  };

  handlePressViewHistoryButton = async => {
    /**
     * Here we will make a network request to check whether the user
     * has any items in the reservation history section. If they do,
     * we will take the user to the next screen along with the data
     * returned from the server. Otherwise, we'll display an appropriate
     * error message for the user here.
     */
    console.log('View History button pressed');
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
        {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
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
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 45,
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
