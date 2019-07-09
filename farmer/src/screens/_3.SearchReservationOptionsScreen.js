import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import { machineryTypeDropdownChoices } from './../data/machineryTypeDropdownChoices';

class SearchReservationOptionsScreen extends Component {
  state = {
    cnic: this.userData.userCnic,
    machineryType: machineryTypeDropdownChoices[0],
    sizeOfLandInHectares: '',
    startDateAndTimeForMachineryUse: new Date(),
    endDateAndTimeForMachineryUse: new Date(),
    showStartDateTimePicker: false,
    showEndDateTimePicker: false,
    displayErrorMessage: false
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
    this.setState({ startDateAndTimeForMachineryUse: date });
  };

  handleEndDateTimeChange = date => {
    this.setState({ endDateAndTimeForMachineryUse: date });
  };

  handleButtonPress = () => {
    console.log('Button pressed');
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
              this.setState({ sizeOfLandInHectares: text.replace(/\D/g, '') }, () =>
                console.log(this.state)
              )
            }
            value={this.state.sizeOfLandInHectares}
            placeholderTextColor="#3CB371"
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
            {/* {this.renderDateInHumanReadableFormat(this.state.startDateAndTimeForMachineryUse)} */}
            {`${this.state.startDateAndTimeForMachineryUse.toDateString()} ${this.state.startDateAndTimeForMachineryUse
              .toTimeString()
              .substr(0, 5)}`}
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
            {`${this.state.endDateAndTimeForMachineryUse.toDateString()} ${this.state.endDateAndTimeForMachineryUse
              .toTimeString()
              .substr(0, 5)}`}
          </Text>
        </View>
        <View style={styles.dateTimePickerContainer}>
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
        {this.state.displayErrorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
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
    textAlign: 'center',
    color: '#3CB371'
  },
  dateTimePickerContainer: {
    // height: 150,
    // width: Dimensions.get('window').width - 20
  },
  dateTimePicker: {
    textAlign: 'center'
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
