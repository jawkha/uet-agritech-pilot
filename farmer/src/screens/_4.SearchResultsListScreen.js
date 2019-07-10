import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import SearchResultsListItem from './../components/SearchResultsListItem';

class SearchResultsListScreen extends Component {
  state = {};

  static navigationOptions = {
    title: 'AVAILABLE CHOICES',
    headerStyle: {
      backgroundColor: '#3CB371'
    },
    headerTintColor: '#FFFFFF'
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

  // getMachineryPhotoUrl = machineryType => {
  //   switch (machineryType) {
  //     case 'Cultivator':
  //       return './../assets/cultivator.jpeg';

  //     case 'Leveler':
  //       return './../assets/leveler.jpg';

  //     case 'Rotavator':
  //       return './../assets/rotavator.jpg';

  //     case 'Disc Harrow':
  //       return './../assets/discharrow.jpeg';

  //     default:
  //       return null;
  //   }
  // };

  // get machineryPhotoUrl() {
  //   return this.getMachineryPhotoUrl(this.userProvidedSearchInputs.machineryType);
  // }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.searchResults.owner.map((item, index) => (
          <SearchResultsListItem
            key={index}
            itemData={item}
            machineryType={this.userProvidedSearchInputs.machineryType}
          />
        ))}
      </ScrollView>
    );
  }
}

export default SearchResultsListScreen;

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 10
  }
});
