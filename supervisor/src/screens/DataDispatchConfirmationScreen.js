import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';

class DataDispatchConfirmationScreen extends Component {
  state = {};

  static navigationOptions = {
    title: 'CONFIRMATION',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  handlePressOkButton = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };

  render() {
    const { navigation } = this.props;
    const reservationID = navigation.getParam('reservationID');

    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          The data for Reservation ID <Text style={styles.reservationId}>{reservationID}</Text> has
          been successfully stored in our servers. Please press the button below to go back to the
          Home screen.
        </Text>

        <TouchableOpacity style={styles.button} onPress={this.handlePressOkButton}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DataDispatchConfirmationScreen;

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
  reservationId: {
    fontWeight: 'bold',
    color: '#3CB371'
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
