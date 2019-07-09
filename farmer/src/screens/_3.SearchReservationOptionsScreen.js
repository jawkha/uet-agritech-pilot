import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { machineryTypeDropdownChoices } from './../data/machineryTypeDropdownChoices';

class SearchReservationOptionsScreen extends Component {
  state = {
    cnic: this.userData.userCnic,
    machineryType: machineryTypeDropdownChoices[0],
    sizeOfLandInHectares: '',
    startDateAndTimeForMachineryUse: new Date(),
    endDateAndTimeForMachineryUse: new Date(),
    show: false,
    mode: 'date'
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

  renderDateInHumanReadableFormat = date => {
    let humanReadableDate = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return humanReadableDate;
  };

  renderTimeInHumanReadableFormat = date => {
    let humanReadableTime = `${date.getHours()}:${date.getMinutes()}`;
    return humanReadableTime;
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: false,
      date
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>CNIC</Text>
          <Text style={styles.questionText}>
            The CNIC you input when logging in has been given here. Please do not try to change it.
          </Text>
          <TextInput style={styles.textInput} value={this.state.cnic} editable={false} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>MACHINERY TYPE</Text>
          <Text style={styles.questionText}>
            Please select the type of machinery from the list below:
          </Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.machineryType}
            style={styles.picker}
            onValueChange={(value, index) =>
              this.setState({ machineryType: value }, () => console.log(this.state))
            }
          >
            {machineryTypeDropdownChoices.map((choice, index) => {
              return <Picker.Item key={index} label={choice} value={choice} />;
            })}
          </Picker>
        </View>
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
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>START DATE FOR MACHINERY USE</Text>
          <Text style={styles.questionText}>
            Please provide the date and time when the work is scheduled to begin.
          </Text>
          <View style={styles.dateAndTimeContainer}>
            <Text style={styles.dateText} onPress={this.datepicker}>
              {this.renderDateInHumanReadableFormat(this.state.startDateAndTimeForMachineryUse)}
            </Text>
            <Text style={styles.timeText} onPress={this.timepicker}>
              {this.renderTimeInHumanReadableFormat(this.state.startDateAndTimeForMachineryUse)}
            </Text>
            {this.state.show && (
              <DateTimePicker
                style={styles.datePickerModal}
                value={this.state.startDateAndTimeForMachineryUse}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
                minimumDate={Date.now()}
              />
            )}
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>END DATE FOR MACHINERY USE</Text>
          <Text style={styles.questionText}>
            Please provide the date and time when the work is scheduled to end.
          </Text>
          <View style={styles.dateAndTimeContainer}>
            <Text style={styles.dateText} onPress={this.datepicker}>
              {this.renderDateInHumanReadableFormat(this.state.endDateAndTimeForMachineryUse)}
            </Text>
            <Text style={styles.timeText} onPress={this.timepicker}>
              {this.renderTimeInHumanReadableFormat(this.state.startDateAndTimeForMachineryUse)}
            </Text>
            {this.state.show && (
              <DateTimePicker
                style={styles.datePickerModal}
                value={this.state.startDateAndTimeForMachineryUse}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
                minimumDate={Date.now()}
              />
            )}
          </View>
        </View>
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
    fontSize: 16
  },
  picker: {
    width: Dimensions.get('window').width - 20
  },
  dateAndTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  dateText: {
    padding: 5
  },
  timeText: {
    padding: 5
  },
  datePickerModal: {
    backgroundColor: '#3CB371'
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
