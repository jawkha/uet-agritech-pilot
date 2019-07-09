import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './src/screens/_1.LoginScreen';
import ChoicesScreen from './src/screens/_2.ChoicesScreen';
import SearchReservationOptionsScreen from './src/screens/_3.SearchReservationOptionsScreen';
import SearchResultsListScreen from './src/screens/_4.SearchResultsListScreen';
import SearchResultsMapScreen from './src/screens/_5.SearchResultsMapScreen';
import SearchResultsItemDetailScreen from './src/screens/_6.SearchResultsItemDetailScreen';

const AppNavigator = createStackNavigator(
  {
    Home: LoginScreen,
    Choices: ChoicesScreen,
    Search: SearchReservationOptionsScreen,
    'Search Results List': SearchResultsListScreen,
    'Search Results Map': SearchResultsMapScreen,
    'Search Detail': SearchResultsItemDetailScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
