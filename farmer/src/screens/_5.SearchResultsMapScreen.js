import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import farmerLocationPin from './../assets/farmerLocationPin.png';
import ownerLocationPin from './../assets/ownerLocationPin.png';

class SearchResultsMapScreen extends Component {
  state = {};

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'AVAILABLE CHOICES',
      headerStyle: {
        backgroundColor: '#3CB371'
      },
      headerTintColor: '#FFFFFF',
      headerRight: (
        <Text
          style={styles.headerListLink}
          onPress={() => {
            const userData = navigation.getParam('userData');
            const userProvidedSearchInputs = navigation.getParam('userProvidedSearchInputs');
            const searchResults = navigation.getParam('searchResults');
            navigation.navigate('Search Results List', {
              /**
               * The data in userProvidedSearchInputs is currently being sent to the
               * next screen only to extract machineryType for displaying the correct
               * picture. Ideally, photos of machinery items would be sent as URLs
               * within the API response and this won't be required.
               * TO DO: Discuss with UET if they can store pictures in S3 and send
               * a URL based on the search query.
               */
              userData,
              userProvidedSearchInputs,
              searchResults
            });
          }}
        >
          List
        </Text>
      )
    };
  };

  get userProfile() {
    const { navigation } = this.props;
    const data = navigation.getParam('userData');

    return data;
  }

  get userProvidedSearchInputs() {
    const { navigation } = this.props;
    const data = navigation.getParam('userProvidedSearchInputs');

    return data;
  }

  get searchResults() {
    const { navigation } = this.props;
    const data = navigation.getParam('searchResults');

    return data;
  }

  handleMarkerPress = item => {
    const { navigation } = this.props;
    const userData = navigation.getParam('userData');
    const userProvidedSearchInputs = navigation.getParam('userProvidedSearchInputs');
    const searchResults = navigation.getParam('searchResults');
    // console.log(navigation.state.params, 'navigation props list screen');
    navigation.navigate('Request Reservation', {
      userData,
      userProvidedSearchInputs,
      searchResults,
      item
    });
  };

  render() {
    const userProfile = this.userProfile;
    console.log(userProfile);
    const farmerLocation = {
      latitude: +userProfile.userProfileData.gis_location_lat,
      longitude: +userProfile.userProfileData.gis_location_lng
    };

    const owners = this.searchResults.owner;

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: farmerLocation.latitude,
            longitude: farmerLocation.longitude,
            // latitude: 32.5792984,
            // longitude: 73.1044728,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2
          }}
        >
          <Marker
            coordinate={{ latitude: farmerLocation.latitude, longitude: farmerLocation.longitude }}
            title={userProfile.userProfileData.name}
          >
            <Image source={farmerLocationPin} style={styles.marker} />
          </Marker>
          {owners &&
            owners.length > 0 &&
            owners.map(owner => {
              return (
                <Marker
                  onPress={() => this.handleMarkerPress(owner)}
                  key={owner.mid}
                  coordinate={{ latitude: +owner.lat, longitude: +owner.lng }}
                  title={`${owner.name} ${owner.fname}`}
                  description={`${owner.make} ${owner.model}`}
                >
                  <Image source={ownerLocationPin} style={styles.marker} />
                </Marker>
              );
            })}
        </MapView>
      </View>
    );
  }
}

export default SearchResultsMapScreen;

const styles = StyleSheet.create({
  headerListLink: {
    paddingRight: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    ...StyleSheet.absoluteFillObject
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
    // justifyContent: 'flex-end',
    // alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    width: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.03
  }
});
