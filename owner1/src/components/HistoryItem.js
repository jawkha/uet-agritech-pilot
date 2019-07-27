/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import moment from 'moment';

class ReservationHistoryListItem extends Component {
  state = {};

  render() {
    const {
      start_date: startDate,
      billAmount: billedAmount,
      FarmerName: farmerFirstName,
      FarmerLastName: farmerLastName,
      address: ownerAddress,
      machineType: machineryType,
      make: machineryMake,
      model: machineryModel,
      area_requested: areaRequested
    } = this.props.item;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.coloredRow}>
          <Text style={styles.coloredRowTextItem}>{moment(startDate).format('DD MMM, YYYY')}</Text>
          <Text style={styles.coloredRowTextItem}>
            {/* Previous versions of JavaScript engines used in React Native could not use the
            commonly used toLocaleString() method. Therefore, in the other UET agritech apps, we
            used the following regex to ensure thousand separator is displayed in the billed amount.
              PKR {billedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
            In the new Hermes JavaScript engine, we can use toLocaleString() now by selecting the 
            international flavor of JavaScript core in `android/app/build.gradle`:
              def jscFlavor = 'org.webkit:android-jsc-intl:+'
            */}
            {/* PKR {billedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
            PKR {billedAmount.toLocaleString()}
          </Text>
        </View>

        <View style={styles.itemContents}>
          <Text style={styles.farmerName}>{`${farmerFirstName} ${farmerLastName}`}</Text>
          <Text style={styles.farmerAddress}>{`{farmer mock address}`}</Text>
          <Text
            style={styles.serviceDescription}
          >{`${machineryType} on ${areaRequested} hectares using ${machineryMake} ${machineryModel}.`}</Text>
        </View>
      </View>
    );
  }
}

export default ReservationHistoryListItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 160,
    width: Dimensions.get('window').width,
    borderColor: '#2491F6',
    borderWidth: 1
  },
  coloredRow: {
    height: 50,
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 145, 246, 0.75)'
  },
  coloredRowTextItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    textTransform: 'uppercase'
  },
  itemContents: {
    paddingLeft: 15,
    paddingTop: 5
  },
  farmerName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  farmerAddress: {
    fontSize: 14,
    color: 'black'
  },
  serviceDescription: {
    marginTop: 20,
    fontSize: 14,
    color: 'black'
  }
});
