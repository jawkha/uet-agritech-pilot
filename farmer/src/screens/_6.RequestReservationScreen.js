import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { apiEndpoints } from './../api/apiEndpoints';

import cultivatorPhoto from './../assets/cultivator.jpeg';
import levelerPhoto from './../assets/leveler.jpg';
import rotavatorPhoto from './../assets/rotavator.jpg';
import discharrowPhoto from './../assets/discharrow.jpeg';

class RequestReservationScreen extends Component {
  state = {
    displayErrorMessage: false,
    errorMessage: ''
  };

  static navigationOptions = {
    title: 'REQUEST RESERVATION',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  selectImageSource = machineryType => {
    switch (machineryType) {
      case 'Cultivator':
        return cultivatorPhoto;

      case 'Leveler':
        return levelerPhoto;

      case 'Rotavator':
        return rotavatorPhoto;

      case 'Disc Harrow':
        return discharrowPhoto;

      default:
        return null;
    }
  };

  get imageSource() {
    const { navigation } = this.props;
    const userProvidedSearchInputs = navigation.getParam('userProvidedSearchInputs');
    return this.selectImageSource(userProvidedSearchInputs.machineryType);
  }

  get itemDetail() {
    const { navigation } = this.props;
    const itemDetail = navigation.getParam('item');

    return itemDetail;
  }

  handleButtonPress = () => {
    this.setState({ displayErrorMessage: false });

    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    const item = navigation.getParam('item');

    const fid = userData.userProfileData.id;
    const oid = item.id;
    const mid = item.mid;
    const {
      startDateAndTimeForMachineryUse,
      endDateAndTimeForMachineryUse,
      sizeOfLandInHectares
    } = navigation.getParam('userProvidedSearchInputs');

    // const startDateAndTimeForMachineryUse =
    //   userProvidedSearchInputs.startDateAndTimeForMachineryUse;
    // const endDateAndTimeForMachineryUse = userProvidedSearchInputs.endDateAndTimeForMachineryUse;

    // console.log(userData, userProvidedSearchInputs, item);

    // This next code block is only being created because the API Endpoint is structured
    // to receive date values as strings. If instead, it could receive UNIX timestamps,
    // none of this would have been required.
    const transformDateAndTime = inputDate => {
      let transformedDate = inputDate
        .toISOString()
        .substr(0, 10)
        .split('-')
        .join('/');

      let transformedTime = inputDate.toISOString().substr(11, 5);
      let transformedDateAndTime = `${transformedDate} ${transformedTime}`;

      return transformedDateAndTime;
    };

    let transformedStartDateAndTimeForMachineryUse = transformDateAndTime(
      startDateAndTimeForMachineryUse
    );
    let transformedEndDateAndTimeForMachineryUse = transformDateAndTime(
      endDateAndTimeForMachineryUse
    );
    // END OF TRANSFORMATION STEP TO PREPARE DATES FOR API ENDPOINTS

    const baseUrl = apiEndpoints.farmerSendReservationRequest.url;
    const constructedUrl = `${baseUrl}?fid=${fid}&oid=${oid}&mid=${mid}&startDate=${transformedStartDateAndTimeForMachineryUse}&endDate=${transformedEndDateAndTimeForMachineryUse}&areaRequested=${sizeOfLandInHectares}`;

    const allRequiredInputsProvided = () => {
      /**
       * We can do validation of query parameters here.
       */
      return true;
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
                    'An error occurred due to which your reservation request could not be sent. Please try again.',
                  displayErrorMessage: true
                });
              } else {
                console.log(
                  'Reservation Request successful. Confirmation message displayed on next screen.'
                );
                const { navigation } = this.props;
                navigation.navigate('Request Sent');
              }
            });
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View>
            <Image source={this.imageSource} style={styles.machineryImage} />
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.machineryInfo}>{`${this.itemDetail.make} ${
              this.itemDetail.model
            }`}</Text>
            <Text style={styles.ownerAddress}>{this.itemDetail.address}</Text>
            <View style={styles.ownerNameAndDistance}>
              <Text style={styles.ownerName}>{`${this.itemDetail.name} ${
                this.itemDetail.fname
              }`}</Text>
              <Text style={styles.ownerDistance}>{`${this.itemDetail.dist}KM`}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleButtonPress}>
          <Text style={styles.buttonText}>REQUEST RESERVATION</Text>
        </TouchableOpacity>
        {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
      </View>
    );
  }
}

export default RequestReservationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 10
  },
  itemContainer: {
    height: 120,
    width: Dimensions.get('window').width - 20,
    borderColor: '#3CB371',
    borderWidth: 0.5
  },
  machineryImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 119,
    width: 119
  },
  itemInfo: {
    height: 120,
    width: Dimensions.get('window').width - 140,
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  machineryInfo: {
    fontWeight: 'bold',
    fontSize: 18
  },
  ownerAddress: {
    fontSize: 14
  },
  ownerNameAndDistance: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ownerName: {
    backgroundColor: '#3CB371',
    width: 136,
    height: 36,
    borderRadius: 20,
    padding: 2,
    color: 'white',
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
    alignItems: 'center'
  },
  ownerDistance: {
    backgroundColor: '#3CB371',
    width: 80,
    height: 36,
    borderRadius: 20,
    padding: 2,
    color: 'white',
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
    alignItems: 'center'
  },
  button: {
    height: 50,
    width: 250,
    marginTop: 25,
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
