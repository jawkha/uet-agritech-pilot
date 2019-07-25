import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './src/screens/_1.LoginScreen';
import ChoicesScreen from './src/screens/_2.ChoicesScreen';
import RequestsListScreen from './src/screens/_3.RequestsListScreen';
import DecideRequestScreen from './src/screens/_4.DecideRequestScreen';
import AcceptanceConfirmationScreen from './src/screens/_5.AcceptanceConfirmationScreen';
import RejectionConfirmationScreen from './src/screens/_6.RejectionConfirmationScreen';
import ReservationsListScreen from './src/screens/_7.ReservationsListScreen';
import ReservationDetailScreen from './src/screens/_8.ReservationDetailScreen';
import ReservationsHistoryScreen from './src/screens/_9.ReservationsHistoryScreen';

const AppNavigator = createStackNavigator(
  {
    Home: LoginScreen,
    Choices: ChoicesScreen,
    RequestsList: RequestsListScreen,
    DecideRequest: DecideRequestScreen,
    AcceptanceConfirmation: AcceptanceConfirmationScreen,
    RejectionConfirmation: RejectionConfirmationScreen,
    ReservationsList: ReservationsListScreen,
    ReservationDetail: ReservationDetailScreen,
    ReservationsHistory: ReservationsHistoryScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2491F6'
      },
      headerTintColor: '#FFFFFF'
    }
  }
);

export default createAppContainer(AppNavigator);
