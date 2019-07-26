import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const NoReservations = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>
        There are no reservations at the moment. Please check later.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(NoReservations);

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
