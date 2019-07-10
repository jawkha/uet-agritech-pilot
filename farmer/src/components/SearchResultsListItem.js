import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';

import cultivatorPhoto from './../assets/cultivator.jpeg';
import levelerPhoto from './../assets/leveler.jpg';
import rotavatorPhoto from './../assets/rotavator.jpg';
import discharrowPhoto from './../assets/discharrow.jpeg';

class SearchResultsListItem extends Component {
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
    return this.selectImageSource(this.props.machineryType);
  }

  render() {
    return (
      /**
       * TO DO: Make the whole item pressable so the user can go to ItemDetail screen
       * by pressing on it.
       */
      <View style={styles.container}>
        <View>
          <Image source={this.imageSource} style={styles.machineryImage} />
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.machineryInfo}>{`${this.props.itemData.make} ${
            this.props.itemData.model
          }`}</Text>
          <Text style={styles.ownerAddress}>Chak No.3, Mandi Bahauddin</Text>
          <View style={styles.ownerNameAndDistance}>
            <Text style={styles.ownerName}>{`${this.props.itemData.name} ${
              this.props.itemData.fname
            }`}</Text>
            <Text style={styles.ownerDistance}>{`${this.props.itemData.dist}KM`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SearchResultsListItem;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: Dimensions.get('window').width - 20,
    borderColor: '#3CB371',
    borderWidth: 0.5
  },
  machineryImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 120,
    width: 120
  },
  itemInfo: {
    height: 120,
    width: Dimensions.get('window').width - 140,
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  machineryInfo: {
    fontWeight: 'bold',
    fontSize: 18
  },
  ownerAddress: {
    fontSize: 14
  },
  ownerNameAndDistance: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ownerName: {
    backgroundColor: '#3CB371',
    width: 136,
    height: 36,
    borderRadius: 20,
    padding: 2,
    color: 'white',
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
    alignItems: 'center'
  },
  ownerDistance: {
    backgroundColor: '#3CB371',
    width: 80,
    height: 36,
    borderRadius: 20,
    padding: 2,
    color: 'white',
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
    alignItems: 'center'
  }
});
