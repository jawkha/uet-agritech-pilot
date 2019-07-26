import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class AcceptanceConfirmationScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'CONFIRM ACCEPTANCE'
    };
  };

  handlePress = () => {
    this.props.navigation.navigate('Choices');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>
          Thank you. You have accepted the reservation request which will now be communicated to the
          farmer. You will now be taken to the home screen.
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AcceptanceConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  messageText: {
    marginTop: 100,
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
    margin: 20,
    padding: 10
  },
  button: {
    height: 50,
    width: 200,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#2491F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal'
  }
});
