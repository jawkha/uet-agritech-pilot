import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import NetInfo from '@react-native-community/netinfo';

import { apiEndpoints } from './../api/apiEndpoints';

import cultivatorPhoto from './../assets/cultivator.jpeg';
import levelerPhoto from './../assets/leveler.jpg';
import rotavatorPhoto from './../assets/rotavator.jpg';
import discharrowPhoto from './../assets/discharrow.jpeg';

class EditReservationScreen extends Component {
  state = {
    sizeOfLandInHectares: this.openRequestItem.area_requested,
    startDateAndTimeForMachineryUse: moment(this.openRequestItem.start_date),
    endDateAndTimeForMachineryUse: moment(this.openRequestItem.end_date),
    showStartDateTimePicker: false,
    showEndDateTimePicker: false,
    displayErrorMessage: false,
    errorMessage: ''
  };

  static navigationOptions = () => {
    return {
      title: 'EDIT RESERVATION',
      headerStyle: {
        backgroundColor: '#3CB371'
      },
      headerTintColor: '#FFFFFF'
    };
  };

  get userProfile() {
    const { navigation } = this.props;
    const data = navigation.getParam('userData');

    return data;
  }

  get openRequestItem() {
    const { navigation } = this.props;
    const data = navigation.getParam('item');

    return data;
  }

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
    return this.selectImageSource(this.openRequestItem.machineType);
  }

  toggleStartDateTimePicker = () => {
    this.setState(
      {
        showStartDateTimePicker: !this.state.showStartDateTimePicker,
        showEndDateTimePicker: false
      },
      () => console.log(this.state.startDateAndTimeForMachineryUse)
    );
  };

  toggleEndDateTimePicker = () => {
    this.setState({
      showEndDateTimePicker: !this.state.showEndDateTimePicker,
      showStartDateTimePicker: false
    });
  };

  handleStartDateTimeChange = date => {
    /**
     * Whenever the user makes a change to the Start Date, we perform the following checks:
     *    SD >= Current Time (ensured by the minimumDate prop in Start Date DatePicker component)
     *    End Date - Start Date >= 1 hour (ensured while setting state after input change)
     */
    this.setState({ startDateAndTimeForMachineryUse: date }, () => {
      if (
        moment(this.state.endDateAndTimeForMachineryUse).diff(
          moment(this.state.startDateAndTimeForMachineryUse),
          'hours'
        ) < 1
      ) {
        this.setState({ endDateAndTimeForMachineryUse: moment(date).add(1, 'hour') });
      }
    });
  };

  handleEndDateTimeChange = date => {
    /**
     * Whenever the user makes a change to the End Date, we perform the following checks:
     *    End Date - Start Date >= 1 hour (ensured while setting state after input change)
     */
    if (moment(date).diff(moment(this.state.startDateAndTimeForMachineryUse), 'hours') < 1) {
      this.setState({
        endDateAndTimeForMachineryUse: moment(this.state.startDateAndTimeForMachineryUse).add(
          1,
          'hour'
        )
      });
    } else {
      this.setState({ endDateAndTimeForMachineryUse: date });
    }
  };

  handleConfirmButtonPress = () => {
    this.setState({ displayErrorMessage: false });
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    const item = navigation.getParam('item');

    const fid = userData.userProfileData.id;
    const oid = item.owner_id;
    const mid = item.mid;
    const {
      startDateAndTimeForMachineryUse,
      endDateAndTimeForMachineryUse,
      sizeOfLandInHectares
    } = this.state;

    /**
     * Whenever the user initiates a Network Request by pressing the button on the
     * screen, we ensure that the input parameters are transformed into the correct
     * format for the API endpoint. For the date inputs, the required format is:
     *        `2019/07/04%2020:00`
     * We previously wrote a function to do this transformation but we can do the same
     * now using moment.
     * The required method for this transformation will be as follows:
     * moment(this.state.startDateAndTimeForMachineryUse).format('YYYY/MM/DD HH:mm')
     * moment(this.state.endDateAndTimeForMachineryUse).format('YYYY/MM/DD HH:mm')
     *
     */

    let transformedStartDateAndTimeForMachineryUse = moment(startDateAndTimeForMachineryUse).format(
      'YYYY/MM/DD HH:mm'
    );
    let transformedEndDateAndTimeForMachineryUse = moment(endDateAndTimeForMachineryUse).format(
      'YYYY/MM/DD HH:mm'
    );

    const baseUrl = apiEndpoints.farmerSendReservationRequest.url;
    const constructedUrl = `${baseUrl}?fid=${fid}&oid=${oid}&mid=${mid}&startDate=${transformedStartDateAndTimeForMachineryUse}&endDate=${transformedEndDateAndTimeForMachineryUse}&areaRequested=${sizeOfLandInHectares}`;

    const allRequiredInputsProvided = () => {
      /**
       * We can do validation of query parameters here.
       */
      if (this.state.sizeOfLandInHectares === '') {
        this.setState(
          {
            errorMessage: 'Please provide the size of the land before making a request.',
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
        return false;
      }
      if (!this.state.sizeOfLandInHectares.match(/^\d{1,5}(\.\d{1,2})?$/) === true) {
        this.setState(
          {
            errorMessage:
              'The size of land provided is not a valid number. There should be at least one but not more than two decimal digits if you are using decimal values. Please correct it and try again.'
          },
          () =>
            Alert.alert('Error', this.state.errorMessage, [
              {
                text: 'OK',
                onPress: () => console.log('OK Button pressed')
              }
            ])
        );
        return false;
      }
      return true;
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
                      'An error occurred due to which the changes in your reservation request could not be sent. Please try again.',
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
                  'Request for changes in Reservation successful. User will be taken to Choices screen now.'
                );
              }
            })
            .then(() => {
              const deleteReservationApiEndpoint = apiEndpoints.farmerDeleteReservationRequest.url;
              const constructedUrlForDeletingReservationRequest = `${deleteReservationApiEndpoint}?rid=${
                item.rid
              }`;
              return fetch(constructedUrlForDeletingReservationRequest)
                .then(response => response.json())
                .then(data => {
                  console.log({ data });
                  if (data.success === 0) {
                    this.setState(
                      {
                        errorMessage:
                          'An unknown error occurred. We are sorry. Please try again. If the error persists, please restart the app.',
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
                      `Reservation request with the ID ${
                        item.rid
                      } has been deleted. The user will be taken to the open reservations list screen.`
                    );
                    navigation.navigate('Choices', { userData });
                  }
                });
            });
        }
      });
    }
  };

  render() {
    const {
      status,
      request_date: requestDate,
      start_date: startDate,
      dist: distance,
      make,
      model,
      owner_address: ownerAddress,
      machineType: machineryType,
      area_requested: areaRequested
    } = this.openRequestItem;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.coloredContainer}>
            <View style={styles.coloredRow}>
              <Text style={styles.coloredRowTextItem}>
                {status === 'notGranted' ? 'PENDING' : 'ACCEPTED'}
              </Text>
              <Text style={styles.coloredRowTextItem}>{moment(requestDate).fromNow()}</Text>
            </View>
            <Image source={this.imageSource} style={styles.machineryImage} />
            <View style={styles.coloredRow}>
              <Text style={styles.coloredRowTextItem}>{`${
                this.openRequestItem['owner name']
              }`}</Text>
              <Text style={styles.coloredRowTextItem}>{`${distance}KM`}</Text>
            </View>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.machineryInfo}>{`${make} ${model}`}</Text>
            <Text style={styles.ownerAddress}>{ownerAddress}</Text>
            <Text
              style={styles.serviceDescription}
            >{`${machineryType} requested on ${areaRequested} hectares on ${moment(
              startDate
            ).format('Do MMM')}.`}</Text>
          </View>
        </View>
        <View style={styles.editPanelContainer}>
          <Text style={styles.textMessage}>
            You can only request changes about size of the land or the date of service. If this is
            what you want to do, please make the required changes in the fields below. If there is
            something else you would like to change, please delete this reservation and make a new
            reservation request.
          </Text>
          <View style={styles.editPanel}>
            {/* ============SIZE OF LAND======================= */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionTitle}>SIZE OF LAND</Text>
              <Text style={styles.questionText}>
                Please input the size of land in hectares where the work will be performed.
              </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text =>
                  this.setState({ sizeOfLandInHectares: text }, () => console.log(this.state))
                }
                value={this.state.sizeOfLandInHectares}
                placeholderTextColor="#3CB371"
                placeholder={this.openRequestItem.area_requested}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {/* ============START DATE AND TIME=================== */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionTitle}>START DATE FOR MACHINERY USE</Text>
              <Text style={styles.questionText}>
                Please provide the date and time when the work is scheduled to begin.
              </Text>

              <Text style={styles.dateText} onPress={this.toggleStartDateTimePicker}>
                {`${moment(this.state.startDateAndTimeForMachineryUse).format(
                  'ddd DD MMM, YYYY HH:mm'
                )}`}
              </Text>
            </View>
            <View>
              {this.state.showStartDateTimePicker && (
                <DatePicker
                  date={this.state.startDateAndTimeForMachineryUse}
                  onDateChange={date => this.handleStartDateTimeChange(date)}
                  minimumDate={new Date()}
                  minuteInterval={5}
                  mode="datetime"
                  textColor="#3CB371"
                  style={styles.dateTimePicker}
                />
              )}
            </View>
            {/* ============END DATE AND TIME=================== */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionTitle}>END DATE FOR MACHINERY USE</Text>
              <Text style={styles.questionText}>
                Please provide the date and time when the work is scheduled to end.
              </Text>
              <Text style={styles.dateText} onPress={this.toggleEndDateTimePicker}>
                {`${moment(this.state.endDateAndTimeForMachineryUse).format(
                  'ddd DD MMM, YYYY HH:mm'
                )}`}
              </Text>
            </View>
            <View>
              {this.state.showEndDateTimePicker && (
                <DatePicker
                  date={this.state.endDateAndTimeForMachineryUse}
                  onDateChange={date => this.handleEndDateTimeChange(date)}
                  minimumDate={this.state.startDateAndTimeForMachineryUse}
                  minuteInterval={5}
                  mode="datetime"
                  textColor="#3CB371"
                  style={styles.dateTimePicker}
                />
              )}
            </View>
            {/* ============END DATE AND TIME=================== */}
            <TouchableOpacity style={styles.confirmButton} onPress={this.handleConfirmButtonPress}>
              <Text style={styles.buttonText}>CONFIRM CHANGES</Text>
            </TouchableOpacity>
            {/* {this.state.displayErrorMessage && (
              <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            )} */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditReservationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  itemContainer: {
    height: 260,
    width: Dimensions.get('window').width,
    borderColor: '#3CB371',
    borderWidth: 1
  },
  coloredContainer: {
    height: 160,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(60, 179, 113, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  coloredRow: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  coloredRowTextItem: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    textTransform: 'uppercase'
  },
  machineryImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  itemInfo: {
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
    paddingLeft: 5
  },
  machineryInfo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  ownerAddress: {
    fontSize: 14,
    color: 'black'
  },
  serviceDescription: {
    marginTop: 15,
    fontSize: 14,
    color: 'black'
  },
  editPanelContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 5
  },
  textMessage: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14,
    margin: 5,
    padding: 5,
    textAlign: 'center'
  },
  questionContainer: {
    height: 150,
    width: Dimensions.get('window').width - 20,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10
  },
  questionTitle: {
    color: '#3CB371',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10
  },
  questionText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    paddingLeft: 10
  },
  textInput: {
    marginTop: 10,
    marginBottom: 0,
    padding: 10,
    borderColor: '#3CB371',
    borderWidth: 0.2,
    textAlign: 'center',
    fontSize: 16,
    color: '#3CB371'
  },
  dateText: {
    marginTop: 15,
    padding: 10,
    textAlign: 'center',
    color: '#3CB371'
  },
  dateTimePicker: {
    alignSelf: 'center'
  },
  confirmButton: {
    borderRadius: 6,
    backgroundColor: '#3CB371',
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 25
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    textTransform: 'uppercase'
  }
});
