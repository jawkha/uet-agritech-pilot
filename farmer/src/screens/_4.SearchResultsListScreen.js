import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Button, Text } from 'react-native';

import SearchResultsListItem from './../components/SearchResultsListItem';

class SearchResultsListScreen extends Component {
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
          style={styles.headerMapLink}
          onPress={() => {
            const userData = navigation.getParam('userData');
            const userProvidedSearchInputs = navigation.getParam('userProvidedSearchInputs');
            const searchResults = navigation.getParam('searchResults');
            navigation.navigate('Search Results Map', {
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
          Map
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

  handleItemPress = item => {
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
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.searchResults.owner.map((item, index) => (
          <SearchResultsListItem
            handleItemPress={this.handleItemPress}
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
  },
  headerMapLink: {
    paddingRight: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
