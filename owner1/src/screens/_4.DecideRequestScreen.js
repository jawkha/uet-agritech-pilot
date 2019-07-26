import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import RequestItem from './../components/RequestItem';

class DecideRequestScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'REQUEST DETAIL'
    };
  };

  handlePressRejectButton = () => {
    console.log('Reject button pressed');
    this.props.navigation.navigate('RejectionConfirmation');
  };

  handlePressAcceptButton = () => {
    console.log('Accept button pressed');
    this.props.navigation.navigate('AcceptanceConfirmation');
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <View style={styles.container}>
        <RequestItem item={item} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={this.handlePressRejectButton}>
            <Text style={styles.buttonText}>REJECT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={this.handlePressAcceptButton}>
            <Text style={styles.buttonText}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(DecideRequestScreen);

const styles = StyleSheet.create({
  container: {
    height: 450,
    width: Dimensions.get('window').width
  },
  buttonContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: 260,
    alignSelf: 'center'
  },
  rejectButton: {
    height: 50,
    width: 120,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#E00E0E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  acceptButton: {
    height: 50,
    width: 120,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#3CB371',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'normal'
  }
});
