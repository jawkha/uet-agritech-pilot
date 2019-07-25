import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, Image } from 'react-native';
import moment from 'moment';

import {
  transformDistanceStringToDistanceNumber,
  tranformAreaRequestedIntoPresentableNumber,
  calculateDurationInHours
} from './../helpers/index';
import farmerImage from './../assets/farmer-image.png';

class RequestItem extends Component {
  render() {
    const {
      request_date: requestDate,
      start_date: startDate,
      end_date: endDate,
      dist: distance,
      make: machineryMake,
      model: machineryModel,
      farmer_name: farmerName,
      farmer_address: farmerAddress,
      machineType: machineryType,
      area_requested: areaRequested
    } = this.props.item;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.props.handleItemPress(this.props.openRequestItem)}
      >
        <View style={styles.coloredContainer}>
          <View style={styles.coloredRow}>
            <Text style={styles.coloredRowTextItem}>{moment(requestDate).fromNow()}</Text>
            <Text style={styles.coloredRowTextItem}>{`${transformDistanceStringToDistanceNumber(
              distance
            )}KM`}</Text>
          </View>
          <View style={styles.keyInfoContainer}>
            <Image source={farmerImage} style={styles.farmerImage} />
            <Text style={styles.farmerName}>{farmerName}</Text>
            <Text style={styles.farmerAddress}>{farmerAddress}</Text>
            <Text style={styles.areaRequested}>
              {tranformAreaRequestedIntoPresentableNumber(areaRequested)}
            </Text>
            <Text style={styles.taskDuration}>{`${calculateDurationInHours(
              startDate,
              endDate
            )}`}</Text>
          </View>
          <View style={styles.coloredRow}>
            <Text style={styles.coloredRowTextItem}>{`${moment(startDate).format(
              'DD MMM, YYYY HH:mm'
            )}`}</Text>
            <Text style={styles.coloredRowTextItem}>{`${moment(endDate).format(
              'DD MMM, YYYY HH:mm'
            )}`}</Text>
          </View>
        </View>
        <View style={styles.itemInfo}>
          <Text
            style={styles.machineryInfo}
          >{`${machineryMake} ${machineryModel} ${machineryType}`}</Text>
          <Text style={styles.machineryRegNo}>Mock Registration Number</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default RequestItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 350,
    width: Dimensions.get('window').width,
    borderColor: '#2491F6',
    borderWidth: 1
  },
  coloredContainer: {
    height: 280,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(36, 145, 246, 0.75)',
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
  keyInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  farmerImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  farmerName: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'normal'
  },
  farmerAddress: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'normal'
  },
  areaRequested: {
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'normal'
  },
  taskDuration: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'normal'
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
  machineryRegNo: {
    marginTop: 15,
    fontSize: 14,
    color: 'black'
  }
});
