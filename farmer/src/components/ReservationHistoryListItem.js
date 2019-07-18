import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import moment from 'moment';

class ReservationHistoryListItem extends Component {
  state = {};

  render() {
    const {
      start_date: startDate,
      billAmount: billedAmount,
      OwnerName: ownerFirstName,
      OwnerLastName: ownerLastName,
      address: ownerAddress,
      machineType: machineryType,
      make: machineryMake,
      model: machineryModel,
      area_requested: areaRequested
    } = this.props.historyItem;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.coloredRow}>
          <Text style={styles.coloredRowTextItem}>{moment(startDate).format('DD MMM, YYYY')}</Text>
          <Text style={styles.coloredRowTextItem}>
            {/* Instead of using the more widely used toLocaleString() method, we are using a regex
            because React Native does not support toLocaleString() on Android. Details about the 
            issue can be referred to here: https://github.com/facebook/react-native/issues/16867 */}
            PKR {billedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>

        <View style={styles.itemContents}>
          <Text style={styles.ownerName}>{`${ownerFirstName} ${ownerLastName}`}</Text>
          <Text style={styles.ownerAddress}>{ownerAddress}</Text>
          <Text
            style={styles.serviceDescription}
          >{`${machineryType} service on ${areaRequested} hectares using ${machineryMake} ${machineryModel}.`}</Text>
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
    borderColor: '#3CB371',
    borderWidth: 1
  },
  coloredRow: {
    height: 50,
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 179, 113, 0.75)'
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
  ownerName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  ownerAddress: {
    fontSize: 14,
    color: 'black'
  },
  serviceDescription: {
    marginTop: 20,
    fontSize: 14,
    color: 'black'
  }
});
