import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  Alert
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';

import { machineryTypeDropdownChoices } from './../data/machineryTypeDropdownChoices';
import { apiEndpoints } from './../api/apiEndpoints';

/**
 * We are performing the following checks on this page regarding date inputs:
 * 1. When the screen loads for the first time, the dates are displayed such that,
 *      End Date - Start Date >= 1 hour
 *    NOTE: One hour difference has been prescribed by UET.
 *    This condition is ensured in the state object by setting Start Date to current
 *    time and End Date to 1 hour ahead of current time.
 *
 * 2. Whenever the user makes a change to the Start Date, we perform the following checks:
 *    SD >= Current Time (ensured by the minimumDate prop in Start Date DatePicker component)
 *    End Date - Start Date >= 1 hour (ensured while setting state after input change)
 *
 * 3. Whenever the user makes a change to the End Date, we perform the following checks:
 *    End Date - Start Date >= 1 hour (ensured while setting state after input change)
 *
 * 4. Whenever the user initiates a Network Request by pressing the button on the
 * screen, we ensure that the input parameters are transformed into the correct
 * format for the API endpoint. For the date inputs, the required format is:
 *        `2019/07/04%2020:00`
 * We previously wrote a function to do this transformation but we can do the same
 * now using moment.
 * The required method for this transformation will be as follows:
 * moment(this.state.startDateAndTimeForMachineryUse).format('YYYY/MM/DD HH:mm')
 * moment(this.state.endDateAndTimeForMachineryUse).format('YYYY/MM/DD HH:mm')
 */

class SearchReservationOptionsScreen extends Component {
  state = {
    cnic: this.userData.userCnic,
    machineryType: machineryTypeDropdownChoices[0],
    sizeOfLandInHectares: '',
    startDateAndTimeForMachineryUse: moment(new Date()),
    endDateAndTimeForMachineryUse: moment(new Date()).add(1, 'hour'),
    showStartDateTimePicker: false,
    showEndDateTimePicker: false,
    errorMessage: ''
    // displayErrorMessage: false,
  };

  static navigationOptions = {
    title: 'MAKE A RESERVATION',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
  };

  get userData() {
    const { navigation } = this.props;
    const data = navigation.getParam('userData');

    return data;
  }

  toggleStartDateTimePicker = () => {
    this.setState({
      showStartDateTimePicker: !this.state.showStartDateTimePicker,
      showEndDateTimePicker: false
    });
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

  handleButtonPress = () => {
    this.setState({ displayErrorMessage: false });

    const {
      cnic,
      machineryType,
      startDateAndTimeForMachineryUse,
      endDateAndTimeForMachineryUse
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

    const baseUrl = apiEndpoints.farmerSearchReservationOptions.url;
    const constructedUrl = `${baseUrl}?farmerNIC=${cnic}&machineType=${machineryType}&startDate=${transformedStartDateAndTimeForMachineryUse}&endDate=${transformedEndDateAndTimeForMachineryUse}`;

    const allRequiredInputsProvided = () => {
      /**
       * We can do input validation here. Currently, all the required except
       * for sizeOfLandInHectares have a default value in the component's state.
       * We are placing a check here to ensure the user also provides the size of land before they can make a request.
       * If the requirements change in the future, the validation parameters can be
       * defined and implemented here.
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
                      'The required machinery is not available during the provided time slot. Please try again with different dates if possible.',
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
                console.log('Search Request successful. Results will be displayed on next screen.');
                const { navigation } = this.props;
                navigation.navigate('Search Results List', {
                  /**
                   * The data in userProvidedSearchInputs is currently being sent to the
                   * next screen only to extract machineryType for displaying the correct
                   * picture. Ideally, photos of machinery items would be sent as URLs
                   * within the API response and this won't be required.
                   * TO DO: Discuss with UET if they can store pictures in S3 and send
                   * a URL based on the search query.
                   */
                  userData: this.userData,
                  userProvidedSearchInputs: {
                    cnic: this.state.cnic,
                    machineryType: this.state.machineryType,
                    sizeOfLandInHectares: this.state.sizeOfLandInHectares,
                    startDateAndTimeForMachineryUse: this.state.startDateAndTimeForMachineryUse,
                    endDateAndTimeForMachineryUse: this.state.endDateAndTimeForMachineryUse
                  },
                  searchResults: data
                });
              }
            });
        }
      });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* ============CNIC================================== */}
        {/* <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>CNIC</Text>
          <Text style={styles.questionText}>
            The CNIC you input when logging in has been given here. Please do not try to change it.
          </Text>
          <TextInput style={styles.textInput} value={this.state.cnic} editable={false} />
        </View> */}
        {/* ============MACHINERY TYPE======================= */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>MACHINERY TYPE</Text>
          <Text style={styles.questionText}>
            Please select the type of machinery from the list below:
          </Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.machineryType}
            style={styles.machineryPicker}
            onValueChange={(value, index) =>
              this.setState({ machineryType: value }, () => console.log(this.state))
            }
          >
            {machineryTypeDropdownChoices.map((choice, index) => {
              return <Picker.Item key={index} label={choice} value={choice} />;
            })}
          </Picker>
        </View>
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
            keyboardType="decimal-pad"
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
        <View style={styles.dateTimePickerContainer}>
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
            {/* {this.renderDateInHumanReadableFormat(this.state.startDateAndTimeForMachineryUse)} */}
            {`${moment(this.state.endDateAndTimeForMachineryUse).format('ddd DD MMM, YYYY HH:mm')}`}
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
        <TouchableOpacity style={styles.button} onPress={this.handleButtonPress}>
          <Text style={styles.buttonText}>CHECK AVAILABILITY</Text>
        </TouchableOpacity>
        {/* {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )} */}
      </ScrollView>
    );
  }
}

export default SearchReservationOptionsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 10
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
  machineryPicker: {
    width: Dimensions.get('window').width - 20,
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
  button: {
    height: 50,
    width: 250,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 6,
    backgroundColor: '#3CB371',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal'
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    margin: 20,
    padding: 10
  }
});
