import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, Image } from 'react-native';
import moment from 'moment';

import cultivatorPhoto from './../assets/cultivator.jpeg';
import levelerPhoto from './../assets/leveler.jpg';
import rotavatorPhoto from './../assets/rotavator.jpg';
import discharrowPhoto from './../assets/discharrow.jpeg';

class OpenRequestListItem extends Component {
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
    return this.selectImageSource(this.props.openRequestItem.machineType);
  }

  render() {
    const {
      status,
      request_date: requestDate,
      dist: distance,
      make,
      model,
      owner_address: ownerAddress,
      machineType: machineryType,
      area_requested: areaRequested
    } = this.props.openRequestItem;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.handleItemPress(this.props.openRequestItem)}
      >
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
              this.props.openRequestItem['owner name']
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
            requestDate
          ).format('Do MMM')}.`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default OpenRequestListItem;

const styles = StyleSheet.create({
  container: {
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
  }
});
