import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { withNavigation } from 'react-navigation';

import RequestItem from './../components/RequestItem';
import { apiEndpoints } from './../api/apiEndpoints';

class DecideRequestScreen extends Component {
  state = {
    errorMessage: ''
  };

  static navigationOptions = () => {
    return {
      title: 'REQUEST DETAIL'
    };
  };

  alertUser = (type, content) => {
    Alert.alert(type, content, [
      {
        text: 'OK',
        onPress: () => console.log('OK Button pressed')
      }
    ]);
  };

  alertUserAboutServerError = () => {
    this.setState(
      {
        errorMessage: 'An error occurred in sending your decision to the server. Please try again.'
      },
      () => this.alertUser('Error', this.state.errorMessage)
    );
  };

  isDeviceOnline = async () => {
    const NetInfoState = await NetInfo.fetch();
    const { isConnected } = NetInfoState;

    if (isConnected === false) {
      this.setState(
        {
          errorMessage:
            'You do not seem to be connected to the internet. Please check your connection settings and try again.'
        },
        () => this.alertUser('Error', this.state.errorMessage)
      );
    }
    return isConnected;
  };

  handlePressRejectButton = async () => {
    console.log('Reject button pressed');
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const baseUrl = apiEndpoints.ownerRejectRequest.url;
    const constructedUrl = `${baseUrl}?rid=${item.rid}&status=notAccepted`;
    /**
     * Here we first confirm that the user is connected to the internet and
     * that a network request can be made for user login.
     */

    const connectionStatus = await this.isDeviceOnline();
    if (connectionStatus === true) {
      console.log('Connected to internet');
      const response = await fetch(constructedUrl);
      const data = await response.json();
      console.log({ data });

      if (data.success === 0) {
        this.alertUserAboutServerError();
        // this.setState(
        //   {
        //     errorMessage:
        //       'An error occurred in sending your decision to the server. Please try again.'
        //   },
        //   () => this.alertUser('Error', this.state.errorMessage)
        // );
      } else {
        this.props.navigation.navigate('RejectionConfirmation');
      }
    }
  };

  handlePressAcceptButton = async () => {
    console.log('Accept button pressed');
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const baseUrl = apiEndpoints.ownerAcceptRequest.url;
    const constructedUrl = `${baseUrl}?rid=${item.rid}&status=accepted`;
    /**
     * Here we first confirm that the user is connected to the internet and
     * that a network request can be made for user login.
     */

    const connectionStatus = await this.isDeviceOnline();
    if (connectionStatus === true) {
      console.log('Connected to internet');
      const response = await fetch(constructedUrl);
      const data = await response.json();
      console.log({ data });

      if (data.success === 0) {
        this.alertUserAboutServerError();
        // this.setState(
        //   {
        //     errorMessage:
        //       'An error occurred in sending your decision to the server. Please try again.'
        //   },
        //   () => this.alertUser('Error', this.state.errorMessage)
        // );
      } else {
        this.props.navigation.navigate('AcceptanceConfirmation');
      }
    }
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
