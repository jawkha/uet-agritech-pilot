import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';

class ReservationIDScreen extends Component {
  state = {
    welcomeMessage: 'Please provide the Reservation ID for this task',
    reservationID: '',
    errorMessage:
      'Please check your reservation details and try again. The Reservation ID provided is invalid.',
    displayErrorMessage: false
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#3CB371'
    }
  };

  handleTextInputChange = text => {
    /**
     * We are using a RegEx to prevent the user from entering white space since
     * the Reservation ID is expected to be a single word String
     */
    this.setState({ displayErrorMessage: false, reservationID: text.replace(/\s/g, '') }, () =>
      console.log(this.state.reservationID)
    );
  };

  isValidReservationID = () => {
    /**
     * Provide validation parameters for the Reservation ID here
     * For now, it only checks that the ID string has a length of 8 characters
     * Also, make sure the error message is updated to reflect the requirements of
     * the Reservation ID.
     */
    const id = this.state.reservationID;
    if (id && id.length > 0) {
      console.log(`Reservation ID ${id} is a valid reservation id.`);
      return true;
    } else {
      this.setState({ displayErrorMessage: true });
      return false;
    }
  };

  handlePress = async => {
    if (this.isValidReservationID() === true) {
      const { navigation } = this.props;
      navigation.navigate('Questionnaire', {
        reservationID: this.state.reservationID
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.banner}>Supervisor</Text>
        <Text style={styles.welcome}>{this.state.welcomeMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleTextInputChange}
          value={this.state.reservationID}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>
        {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  }
}

export default ReservationIDScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  banner: {
    color: '#3CB371',
    fontSize: 30,
    textAlign: 'center',
    margin: 50
  },
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 4
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    padding: 10,
    margin: 10,
    borderRadius: 6,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 8
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
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
