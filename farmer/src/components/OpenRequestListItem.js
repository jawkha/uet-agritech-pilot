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
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.handleItemPress(this.props.openRequestItem)}
      >
        <View style={styles.coloredContainer}>
          <View style={styles.coloredRow}>
            <Text style={styles.coloredRowTextItem}>
              {this.props.openRequestItem.status === 'notGranted' ? 'PENDING' : 'ACCEPTED'}
            </Text>
            <Text style={styles.coloredRowTextItem}>
              {moment(this.props.openRequestItem.request_date).fromNow()}
            </Text>
          </View>
          <Image source={this.imageSource} style={styles.machineryImage} />
          <View style={styles.coloredRow}>
            <Text style={styles.coloredRowTextItem}>{`${
              this.props.openRequestItem['owner name']
            }`}</Text>
            <Text style={styles.coloredRowTextItem}>{`${this.props.openRequestItem.dist}KM`}</Text>
          </View>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.machineryInfo}>{`${this.props.openRequestItem.make} ${
            this.props.openRequestItem.model
          }`}</Text>
          <Text style={styles.ownerAddress}>{this.props.openRequestItem.owner_address}</Text>
          <Text style={styles.serviceDescription}>Service description here</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default OpenRequestListItem;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: Dimensions.get('window').width - 20,
    borderColor: '#3CB371',
    borderWidth: 0.5
  },
  coloredContainer: {
    height: 160,
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#3CB371',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  coloredRow: {
    width: Dimensions.get('window').width - 20,
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
    fontSize: 18
  },
  ownerAddress: {
    fontSize: 14
  },
  serviceDescription: {
    marginTop: 15,
    fontSize: 14
  }
});
