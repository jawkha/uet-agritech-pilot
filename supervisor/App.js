import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ReservationIDScreen from './src/screens/ReservationIDScreen';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import SendDataScreen from './src/screens/SendDataScreen';
import DataDispatchConfirmationScreen from './src/screens/DataDispatchConfirmationScreen';

const AppNavigator = createStackNavigator(
  {
    Home: ReservationIDScreen,
    Questionnaire: QuestionnaireScreen,
    Send: SendDataScreen,
    Confirmation: DataDispatchConfirmationScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
