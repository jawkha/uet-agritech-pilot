import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

class ListContainer extends Component {
  state = {
    isFetchingData: true
  };

  alertUser = (type, content) => {
    Alert.alert(type, content, [
      {
        text: 'OK',
        onPress: () => console.log('OK Button pressed')
      }
    ]);
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

  componentDidMount = async () => {
    const baseUrl = this.props.baseUrl;
    const userCnic = await AsyncStorage.getItem('@cnic');
    const constructedUrl = `${baseUrl}?cnic=${userCnic}`;
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
        this.setState(
          {
            errorMessage: 'There was an error in fetching data from the server.'
          },
          () => this.alertUser('Error', this.state.errorMessage)
        );
      } else {
        console.log('Data fetched from the server.');
        const { reservations } = data;
        this.setState({ reservations, isFetchingData: false }, () =>
          console.log(
            'Reservations data fetched from the server :::::::::',
            this.state.reservations
          )
        );
      }
    }
  };

  render() {
    const { ChildComponent } = this.props;
    const { isFetchingData } = this.state;
    return (
      <View>
        {isFetchingData && <Text>Fetching data</Text>}
        {this.state.reservations &&
          this.state.reservations.length > 0 &&
          this.state.reservations.map((item, index) => {
            return <ChildComponent key={index} item={item} />;
          })}
      </View>
    );
  }
}

export default ListContainer;
