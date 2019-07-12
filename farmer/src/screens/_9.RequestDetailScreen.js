import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

import cultivatorPhoto from './../assets/cultivator.jpeg';
import levelerPhoto from './../assets/leveler.jpg';
import rotavatorPhoto from './../assets/rotavator.jpg';
import discharrowPhoto from './../assets/discharrow.jpeg';

class RequestDetailScreen extends Component {
  state = {};

  static navigationOptions = () => {
    return {
      title: 'REQUEST DETAIL',
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

  handleDeleteButtonPress = () => {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    const item = navigation.getParam('item');

    navigation.navigate('Delete Reservation', {
      userData,
      item
    });
  };

  handleEditButtonPress = () => {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    const item = navigation.getParam('item');

    navigation.navigate('Edit Reservation', {
      userData,
      item
    });
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
      <View styles={styles.container}>
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={this.handleDeleteButtonPress}>
            <Text style={styles.buttonText}>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={this.handleEditButtonPress}>
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RequestDetailScreen;

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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  },
  deleteButton: {
    borderRadius: 6,
    backgroundColor: '#E00E0E',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  editButton: {
    borderRadius: 6,
    backgroundColor: '#E0730E',
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase'
  }
});
