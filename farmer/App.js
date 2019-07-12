import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './src/screens/_1.LoginScreen';
import ChoicesScreen from './src/screens/_2.ChoicesScreen';
import SearchReservationOptionsScreen from './src/screens/_3.SearchReservationOptionsScreen';
import SearchResultsListScreen from './src/screens/_4.SearchResultsListScreen';
import SearchResultsMapScreen from './src/screens/_5.SearchResultsMapScreen';
import RequestReservationScreen from './src/screens/_6.RequestReservationScreen';
import ReservationRequestSentScreen from './src/screens/_7.ReservationRequestSentScreen';
import ViewOpenRequestsListScreen from './src/screens/_8.ViewOpenRequestsListScreen';
import RequestDetailScreen from './src/screens/_9.RequestDetailScreen';

const AppNavigator = createStackNavigator(
  {
    Home: LoginScreen,
    Choices: ChoicesScreen,
    Search: SearchReservationOptionsScreen,
    'Search Results List': SearchResultsListScreen,
    'Search Results Map': SearchResultsMapScreen,
    'Request Reservation': RequestReservationScreen,
    'Request Sent': ReservationRequestSentScreen,
    'Open Requests List': ViewOpenRequestsListScreen,
    'Request Detail': RequestDetailScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
